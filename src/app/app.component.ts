import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState, getIsAuth} from './store/app.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'sas-v2';

  isAuthenticated: Observable<boolean>;

  constructor(private store: Store<AppState>, public router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.store.select(getIsAuth);
  }
}

