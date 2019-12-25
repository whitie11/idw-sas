import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store/app.state';

import { LogOut, ChangeWard } from '../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isAuthenticated: Observable<boolean>;
  username$: Observable<string>;
  selectedWard: string;
  selectedWardName$: Observable<string>;

  wards = [
    { value: 'Churchill', viewValue: 'Churchill' },
    { value: 'Keats', viewValue: 'Keats' },
    { value: 'Byron', viewValue: 'Byron' }
  ];


  constructor(public router: Router, private store: Store<fromStore.AppState>) {
    this.isAuthenticated = this.store.select(fromStore.getIsAuth);
    this.username$ = this.store.select(fromStore.getUsername);
    this.selectedWardName$ = this.store.select(fromStore.getWardName);

    this.selectedWardName$.subscribe(ward => {
      this.selectedWard = ward;
    });

  }

  LogOut(): void {
    this.store.dispatch(new LogOut());
  }

  onWardChanged() {

    console.log(this.selectedWard);
    this.store.dispatch(new ChangeWard(this.selectedWard));

    // tslint:disable-next-line:only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.router.navigated = false;
    const url = this.router.url;
    if (url.startsWith('/patients')) {
      this.router.navigateByUrl('/patients');
    } else {
      this.router.navigateByUrl('/home');
    }
  }

}
