import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of, from, pipe } from 'rxjs';
import { map, catchError, concatMap, tap } from 'rxjs/operators';
import { AllPagesCollected, AddAllSuggestions } from '@app/core/state/gmail-api/suggested/suggested.actions';
import { AppState } from '@app/core/state/core.state';
import { Store } from '@ngrx/store';
import { ISuggested } from '@app/core/state/gmail-api/models/suggested.model';
import { Md5 } from 'ts-md5/dist/md5';
import { GapiToken } from '@app/core/state/auth/auth.reducer';


export interface GmailHeader {
  name: string;
  value: string;
}

export interface GmailHeaders {
  gmailHeaders: GmailHeader[]

}

export interface Payload {
  headers: GmailHeaders;
  mimeType: string;
}

export interface Message {
  id: string;
  threadId: string;
  labelIds: string[];
  snipper: string;
  historyId: string;
  internalDate: string;
  payload: Payload;
}


export interface Thread {
  id: string;
  historyId: string;
  messages: Message[];
}

export interface ThreadPreview {
  id: string;
  historyId: string;
  snippet: string;
}

export interface PageOfThreads {
  threads: ThreadPreview[];
  nextPageToken: string;
  resultSizeEstimate: number;
}


@Injectable()
export class SuggestedService {

    private readonly API_URL: string = 'https://www.googleapis.com/gmail/v1/users';
    private readonly BATCH_API_URL: string = 'https://www.googleapis.com/batch/gmail/v1';

    constructor(private httpClient: HttpClient, private store: Store<AppState>) {}

    public batchTest() {
      return this.httpClient.post<any>(this.BATCH_API_URL, {
        headers: {
          'Content-Type': 'multipart/mixed'
        }
      })
    }




    collectMessage(thread: Observable<Thread>) {
      return thread.pipe(
        tap((result) => {
          // console.log(result);
          this.grabResult(result);
        })
      );
    }

    collectMessages(thread: ThreadPreview) {
      return of(thread).pipe(
        concatMap((thread) => {
          return this.collectMessage(this.getThread(thread.id));
        })
      )
    }


    getThreads(threadIds: ThreadPreview[]): Observable<Thread> {
      return from(threadIds).pipe(
        concatMap((thread) => {
          // console.log(thread);
          return this.collectMessages(thread);
        })
      );
    }

    getFirstPage() {
      this.getFirstPageOfThreads().pipe(
        concatMap((result) => {
          // console.log(result);
          return <Observable<Thread>> this.getThreads(result.threads);
        })
      ).subscribe(response=> {

      },
      err => {

      },
      () => {
        // console.log(this._iSuggested);
        this.store.dispatch(new AddAllSuggestions(this._iSuggested));
      });
    }

    private _iSuggested: ISuggested[] = [];

    private grabResult(result: Thread) {
      let message = result.messages[0];
      let fromSender: string = message.payload.headers[0].value;
      let fromAddress = fromSender.slice(fromSender.search('<+'));
      let fromName = fromSender.slice(0, fromSender.search('<+')-1);
      // console.log(fromName.search('"'));
      if (fromName.search('"') === 0) {
        fromName = fromName.slice(1,-1)
      }
      let iSuggested: ISuggested = {
          id: Md5.hashAsciiStr(fromAddress),
          fromAddress: fromAddress,
          fromName: fromName,
          labelId: undefined,
          labelName: undefined,
          threadIds: [message.threadId],
          count: result.messages.length
        };
        // console.log(iSuggested);
        this._iSuggested.push(iSuggested);
    }




    public getThread(threadId: string): Observable<Thread> {
      return this.httpClient.get<Thread>(this.API_URL + '/me/threads/' + threadId, {
        params: {
          format: 'metadata',
          metadataHeaders: ['From']
        }
      });
    }


    public getFirstPageOfThreads(): Observable<PageOfThreads> {
      return this.httpClient.get<PageOfThreads>(this.API_URL + '/me/threads', {
        params: {
          labelIds: 'INBOX',
          maxResults: '500',
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }

    public getPageOfThreads(pageToken: string): Observable<PageOfThreads> {
      return this.httpClient.get<PageOfThreads>(this.API_URL + '/me/threads', {
        params: {
          labelIds: 'INBOX',
          maxResults: '500',
          pageToken: pageToken
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }


    private readonly MY_API_URL: string = '	https://us-central1-labelorganizer.cloudfunctions.net/api/labels';

    public serverTest(token: GapiToken) {
      return this.httpClient.post(this.MY_API_URL, token);
    }

}
