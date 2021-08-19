// import { Injectable, Injector, ErrorHandler } from '@angular/core';
// import {
//   HttpEvent,
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { LogService } from '../log/log.service';

// /** Passes HttpErrorResponse to application-wide error handler */
// @Injectable()
// export class HttpErrorInterceptor implements HttpInterceptor {
//   constructor(private injector: Injector, private logService: LogService) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return next.handle(request).pipe(
//       catchError((err) => {
//         this.logService.error(err);
//         return of(err);
//       })
//     );
//   }
// }
