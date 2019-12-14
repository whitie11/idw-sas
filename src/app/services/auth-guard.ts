import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

import { Store } from '@ngrx/store';

import { AppState, selectAuthState } from '../store/app.state';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate, OnInit {
   
    getState: Observable<any>;
    isAuthenticated: false;

  constructor (
    public auth: AuthService,
    public router: Router,
    private store: Store<AppState>
    
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
    })
  }


  canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}