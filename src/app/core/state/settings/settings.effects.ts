import { ofType, Actions, createEffect } from '@ngrx/effects';
import { OverlayContainer } from '@angular/cdk/overlay';

import { selectTheme } from './settings.selectors';

import {
  SettingsActionTypes,
  SettingsActions,
  UpdateSettingsStateAction,
  SettingsGetCategoriesRequestAction,
  SettingsSetCategoriesAction,
  SettingsSetCategoriesRequestFailureAction,
  SettingsSetCategoriesRequestAction
} from './settings.actions';

import { INIT, Store, select } from '@ngrx/store';
import { merge, fromEvent, of } from 'rxjs';
import {
  tap,
  withLatestFrom,
  filter,
  map,
  exhaustMap,
  catchError
} from 'rxjs/operators';
import { State } from './settings.reducer';
import { Injectable } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import {
//   AddCategoryDialogComponent,
//   CategoryConfirmationObject
// } from '@app/main/settings/components/add-category-dialog/add-category-dialog.component';
import { SettingsService } from '../../services/settings/settings.service';
import {
  SettingsAddCategoryAction,
  SettingsRemoveCategoryAction,
  SettingsSetCategoriesRequestSuccessAction
} from './settings.actions';
import { LogService } from '@app/core/services/log/log.service';

@Injectable()
export class SettingsEffects {
  updateTheme = createEffect(
    () =>
      merge(
        INIT,
        this.actions$.pipe(ofType(SettingsActionTypes.ChangeTheme))
      ).pipe(
        withLatestFrom(this.store.pipe(select(selectTheme))),
        tap(([action, theme]) => {
          const classList =
            this.overlayContainer.getContainerElement().classList;
          const toRemove = Array.from(classList).filter((item: string) =>
            item.includes('-theme')
          );
          if (toRemove.length > 0) {
            classList.remove(...toRemove);
          }
          classList.add(theme);
        })
      ),
    { dispatch: false }
  );

  onChange$ = createEffect(() =>
    fromEvent<StorageEvent>(window, 'storage').pipe(
      // listen to our storage key
      filter((evt) => {
        return evt.key === 'app-settings';
      }),
      filter((evt) => evt.newValue !== null),
      map((evt) => {
        let settingsState = JSON.parse(evt.newValue);
        return new UpdateSettingsStateAction(settingsState);
      })
    )
  );

  getCategoriesRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<SettingsGetCategoriesRequestAction>(
          SettingsActionTypes.GetCategoriesRequest
        ),
        exhaustMap(() => {
          return this.settingsService.getCategories().pipe(
            map((categoriesResponse) => {
              if (categoriesResponse.status == 'error') {
                this.logService.error(categoriesResponse.status_message);
              } else {
                let categories = categoriesResponse.data.categories;
                this.logService.log(categories);
                this.store.dispatch(
                  new SettingsSetCategoriesAction({ categories: categories })
                );
              }
            }),
            catchError((err) => {
              // Don't display snackbar 'connection' error;
              this.logService.error(err);
              return of(err);
            })
          );
        })
      ),
    { dispatch: false }
  );

  setCategoriesRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<SettingsSetCategoriesRequestAction>(
          SettingsActionTypes.SetCategoriesRequest
        ),
        exhaustMap((action) => {
          let category = action.payload.category;
          let add = action.payload.add;
          let requestBody = {
            add: add,
            category: category
          };
          return this.settingsService.setCategories(requestBody).pipe(
            map((response) => {
              if (response.status === 'error') {
                this.logService.error(response.status_message);
                this.store.dispatch(
                  new SettingsSetCategoriesRequestFailureAction()
                );
              } else {
                if (!add) {
                  this.store.dispatch(
                    new SettingsRemoveCategoryAction({ category: category })
                  );
                } else {
                  this.store.dispatch(
                    new SettingsAddCategoryAction({ category: category })
                  );
                }
                this.store.dispatch(
                  new SettingsSetCategoriesRequestSuccessAction()
                );
              }
            }),
            catchError((err) => {
              this.logService.error(err, 'connection');
              return of(err);
            })
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions<SettingsActions>,
    private store: Store<State>,
    private overlayContainer: OverlayContainer,
    private settingsService: SettingsService,
    private logService: LogService
  ) {}
}
