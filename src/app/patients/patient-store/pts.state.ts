import { createSelector, createFeatureSelector} from '@ngrx/store';
import * as Pts from './reducers/pts.reducer';
import * as fromRoot from '../../store/app.state';
// import { MatFormFieldDefaultOptions } from '@angular/material';

export interface PtsState {
    ptsState: Pts.State;
  }

export const PtReducers = {
    pts: Pts.PtReducer
  };


export const selectPtsState = createFeatureSelector<Pts.State>('pts');
export const rootState = createFeatureSelector<any>('root');

export const getPts = createSelector(selectPtsState, Pts.getTest);

export const getWardName = createSelector(rootState, fromRoot.getWardName);
