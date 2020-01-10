import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';

import { PatientService } from '../../../services/patient.service';
import * as PtsActions from '../actions/pts.actions';
import {
  PatientActionTypes,
 LoadPts
} from '../actions/pts.actions';



@Injectable()
export class PtsEffects {
  constructor(private actions: Actions, private ptService: PatientService) { }

  @Effect()
  LoadPts: Observable<any> = this.actions
  .pipe(ofType(PatientActionTypes.LOAD_PTS))
    .pipe(
      map((action: LoadPts) => action.payload),
      switchMap(payload => {
        return this.ptService.getWardList(payload)
          .pipe(
            map((res) => {
              console.log('return from service ' + res);
              return new PtsActions.LoadPtsSuccess(res);
            }),
            catchError((error) => {
              return of(new PtsActions.LoadPtsFailure({ error }));
            }));
      }))
    ;





}
