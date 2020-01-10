import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { ObservationService } from '../../../services/observation.service';
import * as ObsActions from '../actions/obs.actions';
import {
  ObsActionTypes,
 LoadObs
} from '../actions/obs.actions';



@Injectable()
export class ObsEffects {


  constructor(private actions: Actions, private obsService: ObservationService) { }

  @Effect()
  LoadPts: Observable<any> = this.actions
  .pipe(ofType(ObsActionTypes.LOAD_OBS))
    .pipe(
      map((action: LoadObs) => action.payload),
      switchMap(payload => {
        return this.obsService.getObsRange2(payload.patientId, payload.obsStart, payload.obsEnd)
          .pipe(
            map((res) => {
              return new ObsActions.LoadObsSuccess(res);
            }),
            catchError((error) => {
              return of(new ObsActions.LoadObsFailure({ error }));
            }));
      }))
    ;





}
