import { ofType, Effect, Actions } from '@ngrx/effects';
import { OverlayContainer } from '@angular/cdk/overlay';

import {
  selectTheme,
  selectSettingsState
} from './settings.selectors';
import { SettingsActionTypes, SettingsActions } from './settings.actions';
import { INIT, Store, select } from '@ngrx/store';
import { merge } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import { State } from './settings.reducer';
import { Injectable } from '@angular/core';


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
      if (toRemove.length) {
        classList.remove(...toRemove);
      }
      classList.add(theme);
    })
  );

  constructor(
    private actions$: Actions<SettingsActions>,
    private store: Store<State>,
    private overlayContainer: OverlayContainer
  ) {}

}
