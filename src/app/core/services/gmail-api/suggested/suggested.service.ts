import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


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
    private readonly BATCH_API_URL: string = 'https://www.googleapis.com/batch/gmail/v1'

    constructor(private httpClient: HttpClient) {}

    public batchTest() {
      return this.httpClient.post<any>(this.BATCH_API_URL, {
        headers: {
          'Content-Type': 'multipart/mixed'
        }
      })
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

}
