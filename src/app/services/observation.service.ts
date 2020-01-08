import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { ConfigService } from './config.service';

// import { Observable, config } from '../../../node_modules/rxjs';

import { Obs } from '../models/obs';
import { shareReplay } from '../../../node_modules/rxjs/operators';

import { Observable, from, of } from 'rxjs';
import { map, filter, mergeMap, first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  constructor(private http: HttpClient, private config1: ConfigService) { }

  private obs$: Observable<Obs[]>;

  getObsRange(patientId: number, dateRange: string): Observable<Obs[]> {
    const url = this.config1.getObsRangeUrl() + patientId + '/' + dateRange;

    this.obs$ = this.http.get<Obs[]>(url).pipe(shareReplay());
    console.log('obs from service ' + this.obs$);
    return this.obs$;
  }

  getObsRange2(patientId: number, dateStart: any, dateEnd: any): Observable<Obs[]> {
    const start = dateStart.format('YYYY-MM-DD');
    // dateStart.getUTCFullYear() + '-' + (dateStart.getUTCMonth() + 1) + '-' + (dateStart.getUTCDate() + 1);
    const end = dateEnd.format('YYYY-MM-DD');
    // .getUTCFullYear() + '-' + (dateEnd.getUTCMonth() + 1) + '-' + (dateEnd.getUTCDate() + 1);
    const url = this.config1.getObsRangeUrl2() + patientId + '/' + start + '/' + end;

    this.obs$ = this.http.get<Obs[]>(url).pipe(shareReplay());
    console.log('obs from service ' + this.obs$);
    return this.obs$;
  }


}
