import { Action } from '@ngrx/store';

export enum PatientActionTypes {
  LOAD_PTS = '[pts] Load Pts',
  LOAD_PTS_SUCCESS = '[pts] Load Patients Succcess',
  LOAD_PTS_FAILURE = '[pts] Load Patients Failure',
  SELECT_PT = '[pts] Select patient',
  SELECT_PT_SUCCESS = '[pts] Select patient Success',
  SELECT_PT_FAILURE = '[pts] Select patient Failure',
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

export class SelectPt implements Action {
  readonly type = PatientActionTypes.SELECT_PT;
  constructor(public payload: any) {}
}

export type All =
  | LoadPts
  | LoadPtsSuccess
  | LoadPtsFailure
  | SelectPt
  ;
