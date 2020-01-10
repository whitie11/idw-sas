import { Action } from '@ngrx/store';
import { Obs, ObsPayload } from '../../../models/obs';

export enum ObsActionTypes {
  LOAD_OBS = '[obs] Load Obs',
  LOAD_OBS_SUCCESS = '[obs] Load Obs Succcess',
  LOAD_OBS_FAILURE = '[obs] Load Obs Failure',
}

export class LoadObs implements Action {
  readonly type = ObsActionTypes.LOAD_OBS;
  constructor(public payload: ObsPayload) {}
}

export class LoadObsSuccess implements Action {
  readonly type = ObsActionTypes.LOAD_OBS_SUCCESS;
  constructor(public payload: Obs[]) {}
}

export class LoadObsFailure implements Action {
  readonly type = ObsActionTypes.LOAD_OBS_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | LoadObs
  | LoadObsSuccess
  | LoadObsFailure
  ;
