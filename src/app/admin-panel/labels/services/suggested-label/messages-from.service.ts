import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

// import { GmailLabel } from './models/gmail-label.model';

import { IGmailLabel } from '../../state/models/gmail-label.model';

@Injectable()
export class GmailLabelService {

    private readonly API_URL: string = 'https://www.googleapis.com/gmail/v1/users';

    constructor(private httpClient: HttpClient) {}

    public getAllGmailLabels(): Observable<IGmailLabel[]> {
        return this.httpClient.get(this.API_URL + '/me/labels').pipe(
            retry(0), // retry a failed request up to x times
            map(response =>  response['labels']),
            // catchError(this.handleError) // then handle the error
        );
    }
}
