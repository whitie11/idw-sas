import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure, LogOut
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) { }


  @Effect()
  Login: Observable<any> = this.actions
    .pipe(ofType(AuthActionTypes.LOGIN))
    .pipe(
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        return this.authService.login(payload.username, payload.password)
          .pipe(
            map((res) => {
              console.log(res);
              return new LogInSuccess({ token: res.access_token, username: payload.username });
            }),
            catchError((error) => {
              return of(new LogInFailure({ error }));
            }));
      }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/home');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    })
  );
}
