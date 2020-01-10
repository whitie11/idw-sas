import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuardService } from '../services/auth-guard';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/token.interceptor';
import { PatientsRoutingModule } from './patients-routing.module';
import { StoreModule } from '@ngrx/store';
import { PtReducers } from './patient-store/pts.state';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './patient-store/effects';
import { PatientsWardistComponent } from './patients-wardist/patients-wardist.component';
import { MaterialModule } from '../modules/material.module';


@NgModule({
  declarations: [
     PatientsWardistComponent,
    ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    StoreModule.forFeature('patients', PtReducers),
    EffectsModule.forFeature(effects),
    MaterialModule,
  ],

  providers: [
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
    ],
})
export class PatientsModule { }
