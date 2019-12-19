import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as Pts from './reducers/pts.reducer';
import * as fromRoot from '../../store/app.state';
import * as Auth from '../../store/reducers/auth.reducers';
// import { MatFormFieldDefaultOptions } from '@angular/material';

export interface PtsState {
  ptsState: Pts.State;
}

export interface State extends fromRoot.AppState {
  ptsState: PtsState;

}

export const PtReducers: ActionReducerMap<PtsState> = {
  ptsState: Pts.PtReducer,
};


export const selectPtsState = createFeatureSelector<Pts.State>('pts');
export const selectPts = createSelector(selectPtsState, (state) => state);

export const getPtsWard = createSelector(selectPts, Pts.getPatients);
export const getTest = createSelector(selectPts, Pts.getTest);
// export const getWardName = createSelector(selectPts, Pts.getTest);

export const SelectRootState = createFeatureSelector<Auth.State>('auth');
export const selectRootStore = createSelector(SelectRootState, (state) => state);
// export const rootState = createFeatureSelector<State>('auth');
export const getWardName = createSelector(selectRootStore, Auth.getWardName);

