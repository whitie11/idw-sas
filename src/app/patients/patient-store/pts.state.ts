import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as Pts from './reducers/pts.reducer';
import * as Obs from './reducers/obs.reducer';
import * as Leave from './reducers/leave.reducer';

import * as Auth from '../../store/reducers/auth.reducers';


export interface PtsState {
  pts: Pts.State;
  obs: Obs.State;
leave: Leave.State;
}

// export interface State extends fromRoot.AppState {
//   pts: Pts.State;
//   obs: FromObs.State;
// }

export const PtReducers: ActionReducerMap<PtsState> = {
  pts: Pts.PtReducer,
  obs: Obs.ObsReducer,
  leave: Leave.LeaveReducer
};


export const selectPtsState = createFeatureSelector<PtsState>('patients');
export const getPtsState = createSelector( selectPtsState,  (state: PtsState) => state.pts);

export const getPtsWard = createSelector(getPtsState , Pts.getPatients);
export const getSelectedPt = createSelector(getPtsState , Pts.getSelectePt);
export const getPtsLoading = createSelector(getPtsState , Pts.getLoading);
export const getPtsLoaded = createSelector(getPtsState , Pts.getLoaded);

export const getObsState = createSelector( selectPtsState,  (state: PtsState) => state.obs);
export const getObs = createSelector(getObsState , Obs.getObs);
export const getObsLoading = createSelector(getObsState , Obs.getLoading);
export const getObsLoaded = createSelector(getObsState , Obs.getLoaded);

export const SelectRootState = createFeatureSelector<Auth.State>('auth');
export const selectRootStore = createSelector(SelectRootState, (state) => state);
export const getWardName = createSelector(selectRootStore, Auth.getWardName);

export const getLeaveState = createSelector( selectPtsState,  (state: PtsState) => state.leave);
export const getLeaves = createSelector(getLeaveState , Leave.getLeaves);
export const getLeaveLoading = createSelector(getLeaveState , Leave.getLoading);
export const getLeaveLoaded = createSelector(getLeaveState , Leave.getLoaded);
