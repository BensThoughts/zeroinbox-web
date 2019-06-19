import { ofType, Effect, Actions } from '@ngrx/effects';
import { OverlayContainer } from '@angular/cdk/overlay';

import {
  selectTheme,
} from './settings.selectors';

import { 
  SettingsActionTypes, 
  SettingsActions, 
  UpdateSettingsStateAction,
  SettingsGetCategoriesRequestAction,
  SettingsSetCategoriesAction
} from './settings.actions';

import { INIT, Store, select } from '@ngrx/store';
import { merge, fromEvent, of } from 'rxjs';
import { tap, withLatestFrom, filter, map, exhaustMap, catchError } from 'rxjs/operators';
import { State } from './settings.reducer';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddCategoryDialogComponent, CategoryConfirmationObject } from '@app/main/settings/components/add-category-dialog/add-category-dialog.component';
import { SettingsService } from '../../services/settings/settings.service';


@Injectable()
export class SettingsEffects {

  @Effect({ dispatch: false })
  updateTheme = merge(
    INIT,
    this.actions$.pipe(ofType(SettingsActionTypes.ChangeTheme))
  ).pipe(
    withLatestFrom(this.store.pipe(select(selectTheme))),
    tap(([action, theme]) => {
      const classList = this.overlayContainer.getContainerElement().classList;
      const toRemove = Array.from(classList).filter((item: string) =>
         item.includes('-theme')
      );
      if (toRemove.length > 0) {
        classList.remove(...toRemove);
      }
      classList.add(theme);
    })
  );


  @Effect()
  onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
  // listen to our storage key
    filter((evt) => {
      return evt.key === 'go-app-settings';
    }),
    filter(evt => evt.newValue !== null),
    map(evt => {
      let settingsState = JSON.parse(evt.newValue);
      return new UpdateSettingsStateAction(settingsState);
    })
  );

  @Effect({ dispatch: false })
  getCategories$ = this.actions$.pipe(
    ofType<SettingsGetCategoriesRequestAction>(SettingsActionTypes.GetCategoriesRequest),
    exhaustMap(() => {
      return this.settingsService.getCategories().pipe(
        map((categories) => {
          console.log(categories);
          this.store.dispatch(new SettingsSetCategoriesAction({ categories: categories }))
        }),
        catchError(err => of(err))
      );
    })
  )

  constructor(
    private actions$: Actions<SettingsActions>,
    private store: Store<State>,
    private overlayContainer: OverlayContainer,
    private settingsService: SettingsService
  ) {}

}
