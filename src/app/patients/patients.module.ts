import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientsListComponent } from './patients-list/patients-list.component';

import { AuthGuardService } from '../services/auth-guard';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/token.interceptor';
import { PatientsRoutingModule } from './patients-routing.module';


@NgModule({
  declarations: [
     PatientsListComponent
    ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
  ],
  providers: [
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
    ],
})
export class PatientsModule { }
