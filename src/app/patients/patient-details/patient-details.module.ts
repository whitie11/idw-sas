import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../modules/material.module';

import { PatientDetailsRoutingModule } from './patient-details-routing.module';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { ObsComponent } from './obs/obs.component';

@NgModule({
  declarations: [PatientDetailsComponent, ObsComponent],
  imports: [
    CommonModule,
    PatientDetailsRoutingModule,
    MaterialModule
  ]
})
export class PatientDetailsModule { }
