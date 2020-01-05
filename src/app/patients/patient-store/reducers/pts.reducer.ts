
import { PatientActionTypes, All } from '../actions/pts.actions';
import { Patient } from '../../../models/patient';

export const ptsFeatureKey = 'pts';

export interface State {
  test: string;
  patients: Patient[];
  selectedPt: Patient;
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  test: 'Hello',
  patients: [
    {
      PatientId: null,
      FirstName: '',
      MidName: '',
      LastName: '',
      NHSno: '',
      Birthdate: null,
      WardName: '',
      Leave: null,
      LastSeen: null,
    },
  ],
  selectedPt: {
    PatientId: null,
    FirstName: '',
    MidName: '',
    LastName: '',
    NHSno: '',
    Birthdate: null,
    WardName: '',
    Leave: null,
    LastSeen: null,
  },
  loaded: false,
  loading: false
};

export function PtReducer(state = initialState, action: All): State {
  switch (action.type) {
    case PatientActionTypes.LOAD_PTS: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case PatientActionTypes.LOAD_PTS_SUCCESS: {
      return {
        ...state,
        patients: action.payload,
        loaded: true,
        loading: false
      };
    }
    case PatientActionTypes.LOAD_PTS_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case PatientActionTypes.SELECT_PT: {
      return {
        ...state,
        selectedPt: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}


export const getTest = (state: State) => state.test;
export const getPatients = (state: State) => state.patients;
export const getSelectePt = (state: State) => state.selectedPt;



