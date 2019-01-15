/**
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthUserService } from '../auth-user/auth-user.service';
**/

/**
 * [Injectable TokenInterceptor]
 * Intercepting a token (even when non-existant) into everything may cause a problem
 * ...someday. But it really does make the rest of the app much easier to build.
 * maybe we can selectively inject for https requests that NEED it somehow?
 */

/**
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthUserService;
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthUserService);
    const token: string = this.authService.getToken();
    if (token) { // protect request pre-login for when we do not have a token
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // All of our API endpoints happen to take json
          // 'Content-Type': 'multipart/mixed; boundry=batch_foobaz',
        }
      });
    }
    return next.handle(request);
  }
}
**/
