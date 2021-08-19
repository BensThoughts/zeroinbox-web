import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ActionsService } from '@app/core/services/actions/actions.service';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '@app/core/state/core.state';
import {
  UnsubscribeDialogAction,
  SubscriptionsActionTypes,
  UnsubscribeSenderRequestAction
} from './subscriptions.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { UnsubscribeDialogComponent } from '../components/unsubscribe-dialog/unsubscribe-dialog.component';
import { ActionsRequestBody } from '../../../core/services/actions/actions.service';
import { of } from 'rxjs';
import { UpdateSenderAction } from '@app/core/state/senders/senders.actions';
import { Update } from '@ngrx/entity';
import { ISender } from '../../../core/state/senders/model/senders.model';
// import { send } from 'q';
import { LogService } from '@app/core';

@Injectable()
export class SubscriptionsEffects {
  unsubscribe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<UnsubscribeDialogAction>(
          SubscriptionsActionTypes.UnsubscribeDialog
        ),
        exhaustMap((action) => {
          let sender = action.payload.sender;
          let dialoagRef = this.dialogService.open(UnsubscribeDialogComponent);
          let instance = dialoagRef.componentInstance;
          instance.sender = sender;
          return dialoagRef.afterClosed().pipe(
            map((confirmed: Boolean) => {
              if (confirmed) {
                if (sender.unsubscribeWeb !== null) {
                  window.open(sender.unsubscribeWeb, '_blank');
                }
                this.store.dispatch(
                  new UnsubscribeSenderRequestAction({ sender: sender })
                );
              }
            })
          );
        })
      ),
    { dispatch: false }
  );

  // @Effect({ dispatch: false })
  unsubscribeSenderRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<UnsubscribeSenderRequestAction>(
          SubscriptionsActionTypes.UnsubscribeSenderRequest
        ),
        map((action) => {
          let sender = action.payload.sender;
          let actionsRequestBody: ActionsRequestBody = {
            senderIds: [sender.senderId],
            actionType: 'unsubscribe',
            unsubscribeEmail: sender.unsubscribeEmail,
            unsubscribeWeb: sender.unsubscribeWeb,
            filter: false
          };
          this.actionsService
            .postActions(actionsRequestBody)
            .pipe(
              map((response) => {
                if (response.status == 'error') {
                  this.logService.error(response.status_message);
                } else {
                  let senderUpdate: Update<ISender> = {
                    id: sender.senderId,
                    changes: {
                      unsubscribed: true
                    }
                  };
                  this.store.dispatch(
                    new UpdateSenderAction({ senderUpdate: senderUpdate })
                  );
                }
              }),
              catchError((err) => {
                this.logService.error(err, 'connection');
                return of(err);
              })
            )
            .subscribe();
        }),
        catchError((err) => {
          this.logService.error(err);
          return of(err);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private dialogService: MatDialog,
    private actionsService: ActionsService,
    private logService: LogService
  ) {}
}
