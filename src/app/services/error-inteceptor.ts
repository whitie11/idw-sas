import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.state';
import { SetErrorMessage } from '../store/actions/auth.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store: Store<AppState> ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError( (response: any) => {
        if (response instanceof HttpErrorResponse && response.status === 401) {
          console.log(response);
          localStorage.removeItem('token');
          this.store.dispatch(new SetErrorMessage('You are not authorised to view page'));
          this.router.navigateByUrl('/error');
        }
        return throwError(response);
      }));

    }

}
