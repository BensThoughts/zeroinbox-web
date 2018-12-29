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
/**
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }

}
**/

/**
    public getAllGmailLabels(authtoken: string): Observable<IGmailLabel[]> {
        return this.httpClient.get(this.API_URL + '/me/labels', {
          headers: new HttpHeaders({
                Authorization: `Bearer ${authtoken}`
            })
        }).pipe(
            retry(3), // retry a failed request up to 3 times
            map(response =>  response['labels']),//{
              //return <any>response['labels'].map(labelObject => {
                //console.log("raw item", labelObject);  // uncomment for debug
                //return new IGmailLabel({
                //  id: labelObject.id,
                //  labelListVisibility: labelObject.labelListVisibility,
                //  messageListVisibility: labelObject.messageListVisibility,
                //  name: labelObject.name,
                //  type: labelObject.type
              //  labelObject;
                //});
            //  });
            //}),
            catchError(this.handleError) // then handle the error
        );
    }
**/
