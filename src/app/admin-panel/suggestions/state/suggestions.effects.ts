import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import {
  SuggestionsActionTypes,
  SuggestionsRequestAction,
  SuggestionsRequestFailureAction,
  LoadSuggestionsAction,
  UpdateSuggestionsAction,
} from './suggestions.actions';
import { 
  map, 
  filter, 
  exhaustMap, 
  catchError, 
  concatMap, 
  take
} from 'rxjs/operators';
import { ISuggestion } from '../model/suggestions.model';
import { Update } from '@ngrx/entity';
import { UpdateSuggestionsStateAction } from './suggestions.actions';
import { fromEvent, of } from 'rxjs';
import { SuggestionsService } from '@app/core/services/suggestions/suggestions.service';
import { selectSuggestionAndSenderEntities } from './suggestions.selectors';


@Injectable()
export class SuggestionsEffects {

  @Effect()
  onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
  // listen to our storage key
    filter((evt) => {
      return evt.key === 'go-app-suggestions';
    }),
    filter(evt => evt.newValue !== null),
    map(evt => {
      let suggestionsState = JSON.parse(evt.newValue);
      return new UpdateSuggestionsStateAction(suggestionsState);
    })
  );



  getSizeLabel(label: string) {
    switch(label) {
      case 'XL':
        return 'Size/Extra-Large';
      case 'LG':
        return 'Size/Large';
      case 'MD':
        return 'Size/Medium';
      case 'SM':
        return 'Size/Small';
      case 'XS':
        return 'Size/Extra-Small';
      default:
        return 'Unknown Size';
    }
  }    

/*   @Effect({ dispatch: false })
  updateSuggestions$ = this.actions$
    .pipe(
      ofType<UpdateSuggestionsAction>(SuggestionsActionTypes.UpdateSuggestions),
      concatMap((action) => {
        return this.suggestionsService.postSuggestions(action.payload.suggestions).pipe(
          catchError((err) => {
            return of(console.error(err));
          })
        );
      })
    ) */


  @Effect({ dispatch: false })
  suggestionsRequest$ = this.actions$
    .pipe(
      ofType<SuggestionsRequestAction>(SuggestionsActionTypes.SuggestionsRequest),
      exhaustMap(() => {
        return this.suggestionsService.getSuggestions().pipe(
          map((response) => {
            if (response.status === 'error') {
              this.store.dispatch(new SuggestionsRequestFailureAction());
            }
            let suggestions = response.data.suggestions;
            this.store.dispatch(new LoadSuggestionsAction({ suggestions: suggestions }));
          }),
          catchError((err) => {
            return of(new SuggestionsRequestFailureAction());
          })
        )
      })
    );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private suggestionsService: SuggestionsService) { }
}
