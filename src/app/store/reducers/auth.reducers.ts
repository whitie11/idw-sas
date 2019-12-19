import { User } from '../../models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
  selectedWard: string | '';
}

const initialState: State = {
  isAuthenticated: false,
  user: {
    token: '',
    username: 'Not defined'
  },
  errorMessage: null,
  selectedWard: ''
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          username: action.payload.username
        },
        errorMessage: null,
        selectedWard: action.payload.wardName
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    case AuthActionTypes.CHANGE_WARD: {
      return {
        ...state,
        selectedWard: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getUsernane = (state: State) => state.user.username;
export const getWardName = (state: State) => state.selectedWard;
