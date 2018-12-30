import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  CollectInboxThreadIds,
  SuggestedActionTypes,
  CollectPageOfThreads,
  AllPagesCollected,
  CollectThreadIds,
  BatchTest,
  AddSuggestedMessage,
  CollectMessages
} from './suggested.actions';
import { SuggestedService } from '@app/core/services/gmail-api/suggested/suggested.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core.state';
import { catchError, map, exhaustMap, tap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { selectSuggestedThreadIds } from './suggested.selectors';
import { ISuggested } from '../models/suggested.model';

@Injectable()
export class SuggestedEffects {


  @Effect({dispatch: false})
  batchTest$ = this.actions$
    .pipe(
      ofType<BatchTest>(SuggestedActionTypes.BatchTest),
      exhaustMap(() => {
        return this.suggestedService.batchTest().pipe(
          map((result) => {
            console.log(result);
          })
        );
      })
    )

  @Effect({dispatch: false})
  collectInboxThreadIds$ = this.actions$
    .pipe(
      ofType<CollectInboxThreadIds>(SuggestedActionTypes.CollectInboxThreadIds),
      exhaustMap(() => {
        return this.suggestedService.getFirstPageOfThreads().pipe(
            map((result) => {
              let _threadIds: string[] = [];
              result.threads.forEach((thread) => {
                _threadIds.push(thread.id);
              });
              this.store.dispatch(new CollectThreadIds(_threadIds));
              this.store.dispatch(new CollectPageOfThreads(result.nextPageToken));
            }),
            catchError((err) => of(console.log(err)))
        )
      })
    );

  @Effect({dispatch: false})
  collectPageOfThreads$ = this.actions$
    .pipe(
      ofType<CollectPageOfThreads>(SuggestedActionTypes.CollectPageOfThreads),
      map((action) => {
        if (action.payload !== undefined) {
           this.suggestedService.getPageOfThreads(action.payload).pipe(
             map((result) => {
               // this.store.dispatch(new CollectPageToken(result.nextPageToken));
               let _threadIds: string[] = [];
               result.threads.forEach((thread) => {
                 _threadIds.push(thread.id);
               });
               this.store.dispatch(new CollectThreadIds(_threadIds));
               this.store.dispatch(new CollectPageOfThreads(result.nextPageToken));
             }),
             catchError((err) => of(console.log(err)))
           ).subscribe();
        } else {
          this.store.dispatch(new AllPagesCollected())
        }
      })
    );

    @Effect({dispatch: false})
    allPagesCollected$ = this.actions$
    .pipe(
      ofType<AllPagesCollected>(SuggestedActionTypes.AllPagesCollected),
      map(() => {
          let suggestedThreadIds$ = this.store.pipe(select(selectSuggestedThreadIds));
          suggestedThreadIds$.forEach((threadIds) => {
            threadIds.forEach((id) => {
              this.store.dispatch(new CollectMessages(id));
            })
          });
      })
    );


    @Effect({dispatch: false})
    collectMessages$ = this.actions$
    .pipe(
      ofType<CollectMessages>(SuggestedActionTypes.CollectMessages),
      concatMap((action) => {
        return this.suggestedService.getThread(action.payload).pipe(
          map((result) => {
            let message = result.messages[0];
            let iSuggested: ISuggested = {
                from: message.payload.headers[0].value,
                labelId: undefined,
                labelName: undefined,
                threadIds: [message.threadId],
                count: result.messages.length
              };
              // console.log(message);
              this.store.dispatch(new AddSuggestedMessage(iSuggested));
            })
          )
        })
    );

  constructor(
    private actions$: Actions,
    private suggestedService: SuggestedService,
    private store: Store<AppState>) { }
}
