import { Injectable } from "@angular/core";
import { ofType, Effect, Actions } from '@ngrx/effects';
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

    private XL = 1;
    private LG = .5;
    private MD = .2;
    private SM = .08;

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

    @Effect()
    allSendersRequested$ = this.actions$
      .pipe(
        ofType<SendersRequestAction>(SendersActionTypes.SendersRequest),
        exhaustMap((action) => {
          return this.sendersService.getSenders().pipe(
            map((response) => {
              let senders: ISender[] = response.data.suggestions.map((sender) => {
                let totalSizeEstimate = this.toMB(sender.totalSizeEstimate);
                let sizeGroup = this.getSizeGroup(totalSizeEstimate);
                return {
                  senderId: sender.senderId,
                  fromAddress: sender.senderAddress,
                  fromName: sender.senderNames[0],
                  labelNames: [sender.senderNames[0]],
                  count: sender.count,
                  totalSizeEstimate: totalSizeEstimate,
                  sizeGroup: sizeGroup,
                  unsubscribeEmail: sender.unsubscribeEmail,
                  unsubscribeWeb: sender.unsubscribeWeb
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

      @Effect()
      onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
      // listen to our storage key
        filter((evt) => {
          return evt.key === 'go-app-senders';
        }),
        filter(evt => evt.newValue !== null),
        map(evt => {
          let suggestionsState = JSON.parse(evt.newValue);
          return new UpdateSendersStateAction(suggestionsState);
        })
      );

      constructor(
          private sendersService: SendersService,
          private actions$: Actions
          ) {}
      
}

