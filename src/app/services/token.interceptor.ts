import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

import { AppState, getToken } from '../store/app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthService;
  token$: Observable<string>;
  token: string;

  constructor(private injector: Injector, private store: Store<AppState>) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
this.token$ = this.store.select(getToken);
this.token$.subscribe( t => {
  this.token = t;
});
    // this.authService = this.injector.get(AuthService);
    // const token: string = this.authService.getToken();
request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });
return next.handle(request);
  }
}

