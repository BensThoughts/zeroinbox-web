import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

/*
@Injectable()
export class AuthEffects {
  constructor(private http: HttpClient, private action$: Actions) {}
  // Listen for the 'LOGIN_INITIATED' action
  @Effect()
  login$: Observable<Action> = this.action$.pipe(
    ofType('LOGIN_INITIATED'),
    mergeMap(action =>
      this.http.post('/auth', action.payload).pipe(
        // If successful, dispatch success action with result
        map(data => ({ type: 'LOGIN_SUCCESS', payload: data })),
        // If request fails, dispatch failed action
        catchError(() => of({ type: 'LOGIN_FAILED' }))
      )
    )
  );
}
*/
