import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';


@Injectable()
export class AuthService {
  private BASE_URL = 'http://sasdatamanager-env.hesnzb2zru.eu-west-2.elasticbeanstalk.com/';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  // logIn(email: string, password: string): Observable<any> {
  //   const url = `${this.BASE_URL}/login`;
  //   return this.http.post<User>(url, {email, password});
  // }

  // signUp(email: string, password: string): Observable<User> {
  //   const url = `${this.BASE_URL}/register`;
  //   return this.http.post<User>(url, {email, password});
  // }

    public  login(username: string, password: string) {

       const headers = {'Content-type': 'application/x-www-form-urlencoded'};

       const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

       const url = this.BASE_URL + 'token';
       const result = this.http.post<any>(url, body, {headers});
       console.log(result);
       return  result;

    }
}
