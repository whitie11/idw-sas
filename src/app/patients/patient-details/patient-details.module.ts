import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../modules/material.module';

import { PatientDetailsRoutingModule } from './patient-details-routing.module';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { ObsComponent } from './obs/obs.component';
import { LeaveComponent } from './leave/leave.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { PropertyComponent } from './property/property.component';
import { RestrictedComponent } from './restricted/restricted.component';
import { DialogComponent } from './obs/dialog/dialog.component';

@NgModule({
  declarations:
  [
    PatientDetailsComponent,
    ObsComponent,
    LeaveComponent,
    VisitorsComponent,
    PropertyComponent,
    RestrictedComponent,
    DialogComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    CommonModule,
    PatientDetailsRoutingModule,
    MaterialModule
  ]
})
export class PatientDetailsModule { }
