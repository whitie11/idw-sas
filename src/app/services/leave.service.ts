import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { LeaveReg } from '../models/leaveReg';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient, private config1: ConfigService) { }

  private leaveReg$: Observable<LeaveReg[]>;

  getLeave(patientId: number): Observable<LeaveReg[]> {
    const url = this.config1.getLeavePtUrl() + patientId;

    this.leaveReg$ = this.http.get<LeaveReg[]>(url).pipe(shareReplay());

    return this.leaveReg$;
  }

  getLeavesPt2(patientId: number, dateStart: any, dateEnd: any): Observable<LeaveReg[]> {

//     // .............. temp return all leaves
//    const res = this.getLeave(patientId);
//    return res;
// // ..................


   const start = dateStart.format('YYYY-MM-DD');
    // dateStart.getUTCFullYear() + '-' + (dateStart.getUTCMonth() + 1) + '-' + (dateStart.getUTCDate() + 1);
   const end = dateEnd.format('YYYY-MM-DD');
    // .getUTCFullYear() + '-' + (dateEnd.getUTCMonth() + 1) + '-' + (dateEnd.getUTCDate() + 1);
   const url = this.config1.getLeaveRangeUrl2() + patientId + '/' + start + '/' + end;

   this.leaveReg$ = this.http.get<LeaveReg[]>(url).pipe(shareReplay());

   return this.leaveReg$;
  }
}
