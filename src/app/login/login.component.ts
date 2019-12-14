import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AppState, selectAuthState } from '../store/app.state';
import { LogIn } from '../store/actions/auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formdata: FormGroup;
  x: any;
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;


  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
   }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    
    this.formdata = new FormGroup({
         userName: new FormControl('ian.white'),
         password: new FormControl('P@ssw0rd1')
      });
  }


  onSubmit(data: { userName: any , password: any }): void {
    const payload = {
      username: data.userName,
      password: data.password
    };
    this.store.dispatch(new LogIn(payload));
  }


}
