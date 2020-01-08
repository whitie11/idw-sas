import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromStore from '../store/app.state';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

    // getState: Observable<any>;
    isAuthenticated$: Observable<boolean>;
   token: string;
  constructor(
    public router: Router,
    private store: Store<fromStore.AppState>
  ) {
    this.isAuthenticated$ = this.store.select(fromStore.getIsAuth);
  }

  canActivate(): boolean {
// get observable
const isAuth = this.store.select(fromStore.getIsAuth);

// redirect to sign in page if user is not authenticated
isAuth.subscribe(authenticated => {
  if (!authenticated) {
    this.router.navigateByUrl('/login');
    return false;
  }
});
const token$ = this.store.select(fromStore.getToken);
token$.subscribe(res => {
this.token = res;
} );
if (this.token == null || this.token.length <= 0) {
      this.router.navigateByUrl('/login');
      return false;
    }
return true;
  }
}
