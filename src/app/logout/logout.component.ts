import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store/app.state';
import { LogOut } from '../store/actions/auth.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private store: Store<fromStore.AppState>) { }

  ngOnInit() {
  }

  doLogout() {
     this.store.dispatch(new LogOut());
  //   this.router.navigateByUrl('/login', {replaceUrl: true});
  }

}
