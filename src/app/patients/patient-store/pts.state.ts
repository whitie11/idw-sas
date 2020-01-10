import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as Pts from './reducers/pts.reducer';
import * as fromRoot from '../../store/app.state';
import * as Auth from '../../store/reducers/auth.reducers';
// import { MatFormFieldDefaultOptions } from '@angular/material';

export interface PtsState {
  pts: Pts.State;
}

export interface State extends fromRoot.AppState {
  pts: Pts.State;

}

export const PtReducers: ActionReducerMap<PtsState> = {
  pts: Pts.PtReducer,
};


export const selectPtsState = createFeatureSelector<Pts.State>('pts');
export const selectPts = createSelector(selectPtsState, (state) => state);
export const getPtsWard = createSelector(selectPts, Pts.getPatients);
export const getSelectedPt = createSelector(selectPts, Pts.getSelectePt);

export const SelectRootState = createFeatureSelector<Auth.State>('auth');
export const selectRootStore = createSelector(SelectRootState, (state) => state);
export const getWardName = createSelector(selectRootStore, Auth.getWardName);

