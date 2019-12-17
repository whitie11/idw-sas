import { Action } from '@ngrx/store';

export enum PatientActionTypes {
  LOAD_PTS = '[pts] Load Pts',
  LOAD_PTS_SUCCESS = '[pts] Load Patients Succcess',
  LOAD_PTS_FAILURE = '[pts] Load Patients Failure'
}

export class LoadPts implements Action {
  readonly type = PatientActionTypes.LOAD_PTS;
  constructor(public payload: any) {}
}

export class LoadPtsSuccess implements Action {
  readonly type = PatientActionTypes.LOAD_PTS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadPtsFailure implements Action {
  readonly type = PatientActionTypes.LOAD_PTS_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | LoadPts
  | LoadPtsSuccess
  | LoadPtsFailure;
