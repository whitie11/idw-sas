import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store/app.state';

import { LogOut } from '../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isAuthenticated: Observable<boolean>;
  username$: Observable<string>;

  constructor(private store: Store<fromStore.AppState>) {
    this.isAuthenticated = this.store.select(fromStore.getIsAuth);
    this.username$ = this.store.select(fromStore.getUsername);
  }

  LogOut(): void {
    this.store.dispatch(new LogOut());
  }
}
