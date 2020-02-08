import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { LeaveService } from '../../../services/leave.service';
import * as LeaveActions from '../actions/leave.actions';
import { LeaveActionTypes, LoadLeave } from '../actions/leave.actions';



@Injectable()
export class LeaveEffects {


  constructor(private actions: Actions, private leaveService: LeaveService) { }

  @Effect()
  LoadLeave: Observable<any> = this.actions
  .pipe(ofType(LeaveActionTypes.LOAD_LEAVE))
    .pipe(
      map((action: LoadLeave) => action.payload),
      switchMap(payload => {
        return this.leaveService.getLeavesPt2(payload.patientId, payload.leaveStart, payload.leaveEnd)
          .pipe(
            map((res) => {
              return new LeaveActions.LoadLeaveSuccess(res);
            }),
            catchError((error) => {
              return of(new LeaveActions.LoadLeaveFailure({ error }));
            }));
      }));
}
