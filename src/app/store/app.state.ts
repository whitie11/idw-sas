import * as auth from './reducers/auth.reducers';
import { createFeatureSelector, createSelector} from '@ngrx/store';


export interface AppState {
  auth: auth.State;
}

export const reducers = {
  auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<auth.State>('auth');

export const getIsAuth = createSelector(selectAuthState, auth.getIsAuth);
export const getUsername = createSelector(selectAuthState, auth.getUserName);
export const getToken = createSelector(selectAuthState, auth.getUserToken);
export const getWardName = createSelector(selectAuthState, auth.getWardName);
export const getErrorMessage = createSelector(selectAuthState, auth.getErrorMessage);
