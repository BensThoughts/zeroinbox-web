import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState, selectLabelNamesBySenderId } from '@app/core';
import {
  SuggestionsActionTypes,
  EditLabelAction,
} from './suggestions.actions';
import { 
  map, 
  filter, 
  exhaustMap, 
  catchError, 
  concatMap, 
  take,
  tap
} from 'rxjs/operators';
import { UpdateSuggestionsStateAction, AddLabelAction } from './suggestions.actions';
import { fromEvent, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LabelEditComponent } from '../components/label-edit/label-edit.component';
import { Update } from '@ngrx/entity';
import { ISender } from '../../../core/state/senders/model/senders.model';
import { UpdateSenderAction } from '../../../core/state/senders/senders.actions';


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

  @Effect({dispatch: false})
  editLabel = this.actions$.pipe(
      ofType<EditLabelAction>(SuggestionsActionTypes.EditLabel),
      exhaustMap((action) => {
          let dialoagRef = this.dialogService.open(LabelEditComponent);
          let instance = dialoagRef.componentInstance;
          instance.sender = action.payload.sender;
          instance.labelNames$ = this.store.pipe(
            select(selectLabelNamesBySenderId(action.payload.sender.senderId))
          )
          return dialoagRef
          .afterClosed()
          .pipe(
              map(confirmed => {
                  if (confirmed) {
                      console.log('DELETE');
                  } else {
                      console.log('SAVE');
                  }
              })
          )
      })
  );

  @Effect({dispatch: false})
  addLabel = this.actions$.pipe(
    ofType<AddLabelAction>(SuggestionsActionTypes.AddLabel),
    map((action) => {
      let senderUpdate: Update<ISender>;
      let changes = {
        labelNames: action.payload.sender.labelNames.concat("")
      }
      senderUpdate = {
        id: action.payload.sender.senderId,
        changes
      }
      this.store.dispatch(new UpdateSenderAction({ senderUpdate: senderUpdate }))
    })
  )



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

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private dialogService: MatDialog) { }
}
