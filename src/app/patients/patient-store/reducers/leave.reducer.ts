
import { LeaveActionTypes, All } from '../actions/leave.actions';
import { LeaveReg } from '../../../models/leaveReg';

export const leaveFeatureKey = 'leave';

export interface State {
  leaveArray: LeaveReg[];
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  leaveArray: [],
  loaded: false,
  loading: false
};

export function LeaveReducer(state = initialState, action: All): State {
  switch (action.type) {
    case LeaveActionTypes.LOAD_LEAVE: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case LeaveActionTypes.LOAD_LEAVE_SUCCESS: {
      return {
        ...state,
        leaveArray: action.payload,
        loaded: true,
        loading: false
      };
    }
    case LeaveActionTypes.LOAD_LEAVE_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
}

export const getLeaves = (state: State) => state.leaveArray;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;



