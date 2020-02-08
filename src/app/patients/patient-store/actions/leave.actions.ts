import { Action } from '@ngrx/store';
import { LeaveReg, LeavePayload } from '../../../models/leaveReg';

export enum LeaveActionTypes {
  LOAD_LEAVE = '[leave] Load LeaveReg',
  LOAD_LEAVE_SUCCESS = '[leave] Load leaveReg Succcess',
  LOAD_LEAVE_FAILURE = '[leave] Load leaveReg Failure',
}

export class LoadLeave implements Action {
  readonly type = LeaveActionTypes.LOAD_LEAVE;
  constructor(public payload: LeavePayload) {}
}

export class LoadLeaveSuccess implements Action {
  readonly type = LeaveActionTypes.LOAD_LEAVE_SUCCESS;
  constructor(public payload: LeaveReg[]) {}
}

export class LoadLeaveFailure implements Action {
  readonly type = LeaveActionTypes.LOAD_LEAVE_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | LoadLeave
  | LoadLeaveSuccess
  | LoadLeaveFailure
  ;
