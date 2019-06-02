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
  DeleteSendersRequestAction
} from './suggestions.actions';
import { 
  map, 
  filter, 
  exhaustMap, 
  catchError, 
  retry
} from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LabelDialogComponent, ConfirmationObject } from '../components/label-dialog/label-dialog.component';
import { DeleteSendersAction } from '../../../core/state/senders/senders.actions';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { ActionsService } from '../../../core/services/actions/actions.service';
import { DeleteAllDialogComponent } from '../components/delete-all-dialog/delete-all-dialog.component';
import { LabelSenderRequestAction } from './suggestions.actions';


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
          return dialoagRef
          .afterClosed()
          .pipe(
              map((confirmationObject: ConfirmationObject) => {
                if (confirmationObject === undefined || !confirmationObject.save) {
                  console.log('CANCEL LABEL');
                } else {
                  console.log('LABEL');
                  console.log(confirmationObject.category);
                  console.log(confirmationObject.labelName);
                  this.store.dispatch(new LabelSenderRequestAction({
                    sender: action.payload.sender,
                    labelName: confirmationObject.labelName,
                    category: confirmationObject.category
                  }))
                }
              })
          )
      })
  );

  @Effect({ dispatch: false })
  labelSenderRequest$ = this.actions$.pipe(
    ofType<LabelSenderRequestAction>(SuggestionsActionTypes.LabelSenderRequest),
    map((action) => {
      let senderIds = [action.payload.sender.senderId];
      this.actionsService.postActions({
        senderIds: senderIds,
        actionType: 'label',
        category: action.payload.category,
        labelName: action.payload.labelName
      }).pipe(
        retry(3),
        map((response) => {
          console.log(response);
          this.store.dispatch(new DeleteSendersAction({ senderIds: senderIds }));
        }),
        catchError((err) => of(console.log(err)))
      ).subscribe();
    })
  )

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
        }),
        catchError((err) => of(console.log(err)))
      ).subscribe();
    })
  )


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private dialogService: MatDialog,
    private actionsService: ActionsService) { }
}
