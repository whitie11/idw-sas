import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { LeaveReg } from '../models/LeaveReg';
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
}
