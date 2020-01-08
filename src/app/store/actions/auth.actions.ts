import { Action } from '@ngrx/store';


export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  CHANGE_WARD = '[Auth] Change Ward',
  SET_ERROR_MESSAGE = '[Auth] Set Error Message',
  CLEAR_ERROR_MESSAGE = '[Auth] Clear Error Message'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class ChangeWard implements Action {
  readonly type = AuthActionTypes.CHANGE_WARD;
  constructor(public payload: string) {}
}

export class SetErrorMessage implements Action {
  readonly type = AuthActionTypes.SET_ERROR_MESSAGE;
  constructor(public payload: string) {}
}

export class ClearErrorMessage implements Action {
  readonly type = AuthActionTypes.CLEAR_ERROR_MESSAGE;
  constructor() {}
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | LogOut
  | ChangeWard
  | SetErrorMessage
  | ClearErrorMessage
  ;


