import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GmailLabelService {
    private readonly API_URL: string = 'https://www.googleapis.com/gmail/v1/users';

    constructor(private httpClient: HttpClient) {

    }

    public getLabels(authtoken: string): Observable<any> {
        return this.httpClient.get(this.API_URL + '/me/labels', {
          headers: new HttpHeaders({
                Authorization: `Bearer ${authtoken}`
            })
        });
    }
}
/*
    public listLabels(authtoken: string): Observable<any> {
    return this.httpClient.post(this.API_URL,{}, {
      headers: new HttpHeaders({
            Authorization: `Bearer ${authtoken}`
        })
    });
  }

*/
