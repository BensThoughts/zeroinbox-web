import { Injectable } from "@angular/core";
import { ofType, Effect, Actions } from '@ngrx/effects';
import { SendersActionTypes, SendersRequestAction, AddAllSendersAction, SendersRequestFailureAction } from './senders.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { SendersService } from '../../services/senders/senders.service';
import { ISender } from './model/senders.model';
import { of } from 'rxjs';

@Injectable()
export class SendersEffects {
    private MB = 1000000;
    private DECIMAL = 100;


    toMB(totalSizeEstimate: number) {
        if (totalSizeEstimate === undefined) {
          return 0;
        } else {
          let temp = totalSizeEstimate / this.MB * this.DECIMAL;
          return Math.round(temp)/this.DECIMAL;
        }
    }


    @Effect()
    allSendersRequested$ = this.actions$
      .pipe(
        ofType<SendersRequestAction>(SendersActionTypes.SendersRequest),
        exhaustMap((action) => {
          return this.sendersService.getSenders().pipe(
            map((response) => {
              let senders: ISender[] = response.data.suggestions.map((sender) => {
                let totalSizeEstimate = this.toMB(sender.totalSizeEstimate);
                return {
                  id: sender.senderId,
                  fromAddress: sender.senderAddress,
                  fromName: sender.senderNames[0],
                  count: sender.count,
                  totalSizeEstimate: totalSizeEstimate
                };
              })
              return new AddAllSendersAction({ senders: senders });
            }),
            catchError((err) => {
              console.error(err);
              return of(new SendersRequestFailureAction());
            })
          );
        }),
        catchError((err) => {
          console.error(err);
          return of(new SendersRequestFailureAction());
        })
      );

      constructor(
          private sendersService: SendersService,
          private actions$: Actions
          ) {}
      
}

