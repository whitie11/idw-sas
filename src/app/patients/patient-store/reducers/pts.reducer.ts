
import { PatientActionTypes, All } from '../actions/pts.actions';
import { Patient } from '../../../models/patient';

export const ptsFeatureKey = 'pts';

export interface State {
  test: string;
  patients: Patient[];
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
      LastSeen:  null,
    },
    // {
    //   PatientId: 2,
    //   FirstName: 'Joe',
    //   MidName: '',
    //   LastName: '',
    //   NHSno: '',
    //   Birthdate: null,
    //   WardName: '',
    //   Leave: null,
    //   LastSeen:  null,
    // }
  ]
};

export function PtReducer(state = initialState, action: All): State {
  switch (action.type) {
    case PatientActionTypes.LOAD_PTS_SUCCESS: {
      return {
        ...state,
        patients: action.payload
      };
    }
    case PatientActionTypes.LOAD_PTS_FAILURE: {
      return {
        ...state,

      };
    }

    default: {
      return state;
    }
  }
}


export const getTest = (state: State) => state.test;
export const getPatients = (state: State) => state.patients;



