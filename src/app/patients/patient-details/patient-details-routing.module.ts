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
    canActivate: [AuthGuardService],
    children: [
      // {
      //   path: '',
      //   component: ObsComponent,
      //   canActivate: [AuthGuardService]
      // },
      {
        path: 'obs',
        component: ObsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'leave',
        component: LeaveComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'property',
        component: PropertyComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'visitors',
        component: VisitorsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'restricted-items',
        component: RestrictedComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientDetailsRoutingModule { }
