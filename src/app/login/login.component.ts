import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  // selectedWard: string;
 // selectedWardName$: Observable<string>;
  wards = [
    {value: 'Churchill', viewValue: 'Churchill'},
    {value: 'Keats', viewValue: 'Keats'},
    {value: 'Byron', viewValue: 'Byron'}
  ];

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
   }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });

    this.formdata = new FormGroup({
         userName: new FormControl('Ian.White', [Validators.required]),
         password: new FormControl('P@ssw0rd1', [Validators.required]),
         wardName: new FormControl('Keats', [Validators.required])

      });
  }


  onSubmit(data: { userName: any , password: any, wardName: any }): void {
    const payload = {
      username: data.userName,
      password: data.password,
      wardName: data.wardName
    };
    this.store.dispatch(new LogIn(payload));
  }


}
