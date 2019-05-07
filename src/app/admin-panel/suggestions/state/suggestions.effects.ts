import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState, selectLabelNamesBySenderId } from '@app/core';
import {
  SuggestionsActionTypes,
  LabelSenderDialogAction,
  UpdateSuggestionsStateAction,
  DeleteSenderDialogAction,
  DeleteAllSendersDialogAction,
  DeleteSendersRequestSuccessAction,
  DeleteSendersRequestAction
} from './suggestions.actions';
import { 
  map, 
  filter, 
  exhaustMap, 
  catchError, 
  concatMap, 
  take,
  tap,
  retry
} from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LabelDialogComponent } from '../components/label-dialog/label-dialog.component';
import { Update } from '@ngrx/entity';
import { ISender } from '../../../core/state/senders/model/senders.model';
import { UpdateSenderAction, DeleteSendersAction } from '../../../core/state/senders/senders.actions';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { ActionsService } from '../../../core/services/actions/actions.service';
import { DeleteAllDialogComponent } from '../components/delete-all-dialog/delete-all-dialog.component';


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
      ofType<LabelSenderDialogAction>(SuggestionsActionTypes.LabelSenderDialog),
      exhaustMap((action) => {
          let dialoagRef = this.dialogService.open(LabelDialogComponent);
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
                      console.log('LABEL');
                  } else {
                      console.log('CANCEL LABEL');
                  }
              })
          )
      })
  );

  @Effect({ dispatch: false }) 
  deleteSender$ = this.actions$.pipe(
    ofType<DeleteSenderDialogAction>(SuggestionsActionTypes.DeleteSenderDialog),
    exhaustMap((action) => {
      let dialogRef = this.dialogService.open(DeleteDialogComponent);
      let instance = dialogRef.componentInstance;
      instance.sender = action.payload.sender;
      return dialogRef
      .afterClosed()
      .pipe(
        map(confirmed => {
          if (confirmed) {
            console.log('DELETE');
            this.store.dispatch(new DeleteSendersRequestAction({ senders: [action.payload.sender] }))
          } else {
            console.log('CANCEL DELETE');
          }
        })
      )
    })
  )

  @Effect({ dispatch: false })
  deleteAllSenders$ = this.actions$.pipe(
    ofType<DeleteAllSendersDialogAction>(SuggestionsActionTypes.DeleteAllSendersDialog),
    exhaustMap((action) => {
      let dialogRef = this.dialogService.open(DeleteAllDialogComponent);
      let instance = dialogRef.componentInstance;
      instance.senders = action.payload.senders;
      return dialogRef
      .afterClosed()
      .pipe(
        map(confirmed => {
          if (confirmed) {
            console.log('DELETE_ALL');
            this.store.dispatch(new DeleteSendersRequestAction({ senders: action.payload.senders }))
          } else {
            console.log('CANCEL DELETE_ALL');
          }
        })
      )

    })
  )

  @Effect({ dispatch: false })
  deleteSenderRequest$ = this.actions$.pipe(
    ofType<DeleteSendersRequestAction>(SuggestionsActionTypes.DeleteSenderRequest),
    map((action) => {
      let senderIds = action.payload.senders.map(sender => sender.senderId)
      this.actionsService.postActions({
        senderIds: senderIds,
        actionType: 'delete'
      }).pipe(
        retry(3),
        map((response) => {
          console.log(response);
          this.store.dispatch(new DeleteSendersAction({ senderIds: senderIds }));
          // this.store.dispatch(new DeleteSenderRequestSuccessAction({ senderId: action.payload.sender.senderId }))
        }),
        catchError((err) => of(console.log(err)))
      ).subscribe();
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
    private dialogService: MatDialog,
    private actionsService: ActionsService) { }
}
