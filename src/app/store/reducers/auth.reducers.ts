import { User } from '../../models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: {
    token: '',
    username: 'Not defined'
  },
  errorMessage: null
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
        errorMessage: null
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
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getUsernane = (state: State) => state.user.username;
