import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, selectAuthState } from '../store/app.state';
import { LogOut } from '../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: false;
  username: string;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
    this.username = 'Current user';
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.username = state.user.username;
  });
}



  LogOut(): void {
    this.store.dispatch(new LogOut());
  }
}
