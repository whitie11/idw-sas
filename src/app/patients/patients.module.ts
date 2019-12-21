import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailsComponent } from './patient-details/patient-details.component';

import { AuthGuardService } from '../services/auth-guard';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/token.interceptor';
import { PatientsRoutingModule } from './patients-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromPts from './patient-store/reducers/pts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PtsEffects } from './patient-store/effects/pts.effects';
import { PatientsWardistComponent } from './patients-wardist/patients-wardist.component';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
import { MaterialModule } from '../modules/material.module';

@NgModule({
  declarations: [
     PatientsWardistComponent
    ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    StoreModule.forFeature('pts', fromPts.PtReducer),
    EffectsModule.forFeature([PtsEffects]),
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    MaterialModule,
  ],
  providers: [
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
    ],
})
export class PatientsModule { }
