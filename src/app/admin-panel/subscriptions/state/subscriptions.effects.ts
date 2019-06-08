import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationService } from '@app/core/services/notifications/notification.service';
import { ActionsService } from '@app/core/services/actions/actions.service';
import { MatDialog } from '@angular/material';
import { AppState } from '@app/core/state/core.state';
import { UnsubscribeDialogAction, SubscriptionsActionTypes, UnsubscribeSenderRequestAction } from './subscriptions.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { UnsubscribeDialogComponent } from '../components/unsubscribe-dialog/unsubscribe-dialog.component';
import { ActionsRequestBody } from '../../../core/services/actions/actions.service';
import { of } from 'rxjs';

@Injectable()
export class SubscriptionsEffects {


    @Effect({dispatch: false})
    unsubscribe$ = this.actions$.pipe(
      ofType<UnsubscribeDialogAction>(SubscriptionsActionTypes.UnsubscribeDialog),
      exhaustMap((action) => {
          let sender = action.payload.sender;
          let dialoagRef = this.dialogService.open(UnsubscribeDialogComponent);
          let instance = dialoagRef.componentInstance;
          instance.sender = sender;
          return dialoagRef
          .afterClosed()
          .pipe(
              map((confirmed: Boolean) => {
                if (confirmed) {
                  if (sender.unsubscribeWeb !== null) {
                    window.open(sender.unsubscribeWeb, '_blank');
                  } else if (sender.unsubscribeEmail !== null) {
                    this.store.dispatch(new UnsubscribeSenderRequestAction({ sender: sender }));
                  }
                }
              })
          )
      })
    );

    @Effect({dispatch: false})
    unsubscribeSenderRequest$ = this.actions$.pipe(
      ofType<UnsubscribeSenderRequestAction>(SubscriptionsActionTypes.UnsubscribeSenderRequest),
      map((action) => {
        let sender = action.payload.sender;
        let actionsRequestBody: ActionsRequestBody = {
          senderIds: [sender.senderId],
          actionType: 'unsubscribe',
          filter: false
        };
       /*  this.actionsService.postActions(actionsRequestBody).pipe(
          map((response) => {
            if (response.status == 'error') {
              console.error(response.status_message)
            }
          }),
          catchError((err) => {
            this.notificationService.connectionError();
            return of(err);
          })
        ).subscribe(); */
      })
    )


    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private dialogService: MatDialog,
        private actionsService: ActionsService,
        private notificationService: NotificationService) { }
}