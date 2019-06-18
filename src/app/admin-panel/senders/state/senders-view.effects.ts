import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState, selectLabelNamesBySenderId } from '@app/core';
import {
  SendersViewActionTypes,
  LabelSenderDialogAction,
  UpdateSendersViewStateAction,
  DeleteSenderDialogAction,
  DeleteAllSendersDialogAction,
  DeleteSendersRequestAction,
  LabelAllSendersDialogAction
} from './senders-view.actions';
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
import { DeleteSendersAction } from '@app/core/state/senders/senders.actions';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { ActionsService } from '@app/core/services/actions/actions.service';
import { DeleteAllDialogComponent } from '../components/delete-all-dialog/delete-all-dialog.component';
import { LabelSendersRequestAction } from './senders-view.actions';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { LabelAllDialogComponent } from '../components/label-all-dialog/label-all-dialog.component';


@Injectable()
export class SendersViewEffects {

  @Effect()
  onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
  // listen to our storage key
    filter((evt) => {
      return evt.key === 'go-app-suggestions';
    }),
    filter(evt => evt.newValue !== null),
    map(evt => {
      let suggestionsState = JSON.parse(evt.newValue);
      return new UpdateSendersViewStateAction(suggestionsState);
    })
  );

  @Effect({dispatch: false})
  editLabel = this.actions$.pipe(
      ofType<LabelSenderDialogAction>(SendersViewActionTypes.LabelSenderDialog),
      exhaustMap((action) => {
          let dialoagRef = this.dialogService.open(LabelDialogComponent);
          let instance = dialoagRef.componentInstance;
          instance.sender = action.payload.sender;
          return dialoagRef
          .afterClosed()
          .pipe(
              map((confirmationObject: ConfirmationObject) => {
                if (confirmationObject === undefined || !confirmationObject.save) {
                  // Do nothing
                } else {
                  // console.log(confirmationObject.category);
                  // console.log(confirmationObject.labelName);
                  this.store.dispatch(new LabelSendersRequestAction({
                    senders: [action.payload.sender],
                    labelName: confirmationObject.labelName,
                    category: confirmationObject.category
                  }))
                }
              })
          )
      })
  );

  @Effect({ dispatch: false })
  labelAllSendersDialog$ = this.actions$.pipe(
    ofType<LabelAllSendersDialogAction>(SendersViewActionTypes.LabelAllSendersDialog),
    exhaustMap((action) => {
      let dialogRef = this.dialogService.open(LabelAllDialogComponent);
      let instance = dialogRef.componentInstance;
      instance.senders = action.payload.senders;
      return dialogRef
      .afterClosed()
      .pipe(
        map(confirmationObject => {
          if (confirmationObject === undefined || !confirmationObject.save) {
            // Do Nothing
          } else {
            this.store.dispatch(new LabelSendersRequestAction({
              senders: action.payload.senders,
              labelName: confirmationObject.labelName,
              category: confirmationObject.category
            }))    
          }
        })
      )
    })
  )

  @Effect({ dispatch: false })
  labelSendersRequest$ = this.actions$.pipe(
    ofType<LabelSendersRequestAction>(SendersViewActionTypes.LabelSendersRequest),
    map((action) => {
      let senderIds = action.payload.senders.map(sender => sender.senderId)
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
        catchError((err) => {
          this.notificationService.connectionError();
          return of(console.log(err))
        })
      ).subscribe();
    })
  )

  @Effect({ dispatch: false }) 
  deleteSenderDialog$ = this.actions$.pipe(
    ofType<DeleteSenderDialogAction>(SendersViewActionTypes.DeleteSenderDialog),
    exhaustMap((action) => {
      let dialogRef = this.dialogService.open(DeleteDialogComponent);
      let instance = dialogRef.componentInstance;
      instance.sender = action.payload.sender;
      return dialogRef
      .afterClosed()
      .pipe(
        map(confirmed => {
          if (confirmed) {
            this.store.dispatch(new DeleteSendersRequestAction({ senders: [action.payload.sender] }))
          } else {
          }
        })
      )
    })
  )

  @Effect({ dispatch: false })
  deleteAllSendersDialog$ = this.actions$.pipe(
    ofType<DeleteAllSendersDialogAction>(SendersViewActionTypes.DeleteAllSendersDialog),
    exhaustMap((action) => {
      let dialogRef = this.dialogService.open(DeleteAllDialogComponent);
      let instance = dialogRef.componentInstance;
      instance.senders = action.payload.senders;
      return dialogRef
      .afterClosed()
      .pipe(
        map(confirmed => {
          if (confirmed) {
            this.store.dispatch(new DeleteSendersRequestAction({ senders: action.payload.senders }))
          } else {
          }
        })
      )
    })
  )


  @Effect({ dispatch: false })
  deleteSenderRequest$ = this.actions$.pipe(
    ofType<DeleteSendersRequestAction>(SendersViewActionTypes.DeleteSendersRequest),
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
        catchError((err) => {
          this.notificationService.connectionError();
          return of(console.log(err))
        })
      ).subscribe();
    })
  )


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private dialogService: MatDialog,
    private actionsService: ActionsService,
    private notificationService: NotificationService) { }
}