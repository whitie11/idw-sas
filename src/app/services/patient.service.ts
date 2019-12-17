import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { ConfigService } from './config.service';

// import { Observable, config } from '../../../node_modules/rxjs';

import { Patient } from '../models/patient';
import { shareReplay, catchError } from '../../../node_modules/rxjs/operators';

import { Observable, from, of } from 'rxjs';
import { map, filter, mergeMap, first } from 'rxjs/operators';

import { PatientsModule } from '../patients/patients.module';

@Injectable({
  providedIn: 'root'
})

export class PatientService {
    private baseurl: string;

    constructor(private http: HttpClient, private config1: ConfigService) { }

    private patient$: Observable<Patient[]>;
    private pt$: Observable<Patient>;

    getAllPatients(): Observable<Patient[]> {

        this.patient$ = this.http.get<Patient[]>(this.config1.getAllPatientsUrl()).pipe(shareReplay());

        return this.patient$;

    }

        getWardList(wardName: string): Observable<Patient[]> {
            const url = this.config1.getWardListUrl() + wardName;
            console.log('getting patients');
            this.patient$ = this.http.get<Patient[]>(url).pipe(shareReplay());

            return this.patient$;
        }

    getPatientById(id: number): Observable<Patient> {
        const url = this.config1.getpatientByIdUrl()  + id;
        console.log('URL = ' + url);
        this.pt$ = this.http.get<Patient>(url).pipe(shareReplay());
        console.log('patient from service ' + this.patient$);
        return this.pt$;
    }

}
