import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState, selectAuthState } from './store/app.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'sas-v2';

  getState: Observable<any>;
  isAuthenticated: false;

  constructor(private store: Store<AppState>, public router: Router) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
    });
  }
}

