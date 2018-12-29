import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

// import { GmailLabel } from './models/gmail-label.model';

import { IGmailLabel } from '../../../state/gmail-api/models/gmail-label.model';

@Injectable()
export class SuggestedService {

    private readonly API_URL: string = 'https://www.googleapis.com/gmail/v1/users';

    constructor(private httpClient: HttpClient) {}

    public getAllInboxMessageIds(): any {
        return this.httpClient.get(this.API_URL + '/me/messages').pipe(
            retry(0), // retry a failed request up to x times
            map(response =>  console.log(response)),
            // catchError(this.handleError) // then handle the error
        );
    }
}
