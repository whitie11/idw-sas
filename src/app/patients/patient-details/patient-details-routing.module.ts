import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard';

import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { ObsComponent } from './obs/obs.component';
import { LeaveComponent } from './leave/leave.component';
import { PropertyComponent } from './property/property.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { RestrictedComponent } from './restricted/restricted.component';

const routes: Routes = [
  {
    path: '',
    component: PatientDetailsComponent,
    children: [
      {
        path: 'obs',
        component: ObsComponent
      },
      {
        path: 'leave',
        component: LeaveComponent
      },
      {
        path: 'property',
        component: PropertyComponent
      },
      {
        path: 'visitors',
        component: VisitorsComponent
      },
      {
        path: 'restricted-items',
        component: RestrictedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientDetailsRoutingModule { }
