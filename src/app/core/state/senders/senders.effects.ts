import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import {
  SendersActionTypes,
  SendersRequestAction,
  AddAllSendersAction,
  SendersRequestFailureAction,
  UpdateSendersStateAction
} from './senders.actions';
import { exhaustMap, map, catchError, filter } from 'rxjs/operators';
import { SendersService } from '../../services/senders/senders.service';
import { ISender } from './model/senders.model';
import { of, fromEvent } from 'rxjs';
import { NotificationService } from '../../services/notifications/notification.service';
import { LogService } from '@app/core/services/log/log.service';

@Injectable()
export class SendersEffects {
  private MB = 1000000;
  private DECIMAL = 100;

  toMB(totalSizeEstimate: number) {
    if (totalSizeEstimate === undefined) {
      return 0;
    } else {
      let temp = (totalSizeEstimate / this.MB) * this.DECIMAL;
      return Math.round(temp) / this.DECIMAL;
    }
  }

  private XL = 1;
  private LG = 0.5;
  private MD = 0.2;
  private SM = 0.08;

  getSizeGroup(totalSizeEstimate) {
    if (totalSizeEstimate > this.XL) {
      return 'XL';
    }
    if (totalSizeEstimate < this.XL && totalSizeEstimate > this.LG) {
      return 'LG';
    }
    if (totalSizeEstimate < this.LG && totalSizeEstimate > this.MD) {
      return 'MD';
    }
    if (totalSizeEstimate < this.MD && totalSizeEstimate > this.SM) {
      return 'SM';
    }
    return 'XS';
  }

  allSendersRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SendersRequestAction>(SendersActionTypes.SendersRequest),
      exhaustMap(() => {
        return this.sendersService.getSenders().pipe(
          map((response) => {
            let senders: ISender[] = response.data.senders.map((sender) => {
              let totalSizeEstimate = this.toMB(sender.totalSizeEstimate);
              let sizeGroup = this.getSizeGroup(totalSizeEstimate);
              return {
                senderId: sender.senderId,
                fromAddress: sender.senderAddress,
                fromName: sender.senderNames[0],
                labelNames: [sender.senderNames[0]],
                threadIdCount: sender.threadIdCount,
                totalSizeEstimate: totalSizeEstimate,
                sizeGroup: sizeGroup,
                unsubscribeEmail: sender.unsubscribeEmail,
                unsubscribeWeb: sender.unsubscribeWeb,
                unsubscribed: sender.unsubscribed,
                messageIdCount: sender.messageIdCount
              };
            });
            return new AddAllSendersAction({ senders: senders });
          }),
          catchError((err) => {
            this.notificationService.connectionError();
            console.error(err);
            return of(new SendersRequestFailureAction());
          })
        );
      }),
      catchError((err) => {
        this.logService.error(err);
        return of(new SendersRequestFailureAction());
      })
    )
  );

  // @Effect()
  onChange$ = createEffect(() =>
    fromEvent<StorageEvent>(window, 'storage').pipe(
      // listen to our storage key
      filter((evt) => {
        return evt.key === 'app-senders';
      }),
      filter((evt) => evt.newValue !== null),
      map((evt) => {
        let suggestionsState = JSON.parse(evt.newValue);
        return new UpdateSendersStateAction(suggestionsState);
      })
    )
  );

  constructor(
    private sendersService: SendersService,
    private actions$: Actions,
    private notificationService: NotificationService,
    private logService: LogService
  ) {}
}
