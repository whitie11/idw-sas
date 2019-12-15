import * as auth from './reducers/auth.reducers';
import { createFeatureSelector, createSelector} from '@ngrx/store';


export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<auth.State>('auth');

export const getIsAuth = createSelector(selectAuthState, auth.getIsAuth);
export const getUsername = createSelector(selectAuthState, auth.getUsernane);
export const getWardName = createSelector(selectAuthState, auth.getWardName);
