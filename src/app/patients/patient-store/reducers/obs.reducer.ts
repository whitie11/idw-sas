
import { ObsActionTypes, All } from '../actions/obs.actions';
import { Obs } from '../../../models/obs';

export const obsFeatureKey = 'obs';

export interface State {
  obsArray: Obs[];
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  obsArray: [],
  loaded: false,
  loading: false
};

export function ObsReducer(state = initialState, action: All): State {
  switch (action.type) {
    case ObsActionTypes.LOAD_OBS: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case ObsActionTypes.LOAD_OBS_SUCCESS: {
      return {
        ...state,
        obsArray: action.payload,
        loaded: true,
        loading: false
      };
    }
    case ObsActionTypes.LOAD_OBS_FAILURE: {
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

export const getObs = (state: State) => state.obsArray;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;



