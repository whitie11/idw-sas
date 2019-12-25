import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard';

import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { ObsComponent } from './obs/obs.component';

const routes: Routes = [
  {
    path: '',
    component: PatientDetailsComponent,
    children: [
      {
        path: 'obs',
        component: ObsComponent
      }
      //     {
      //         path: 'pt-leave/:patientId',
      // component: LeaveComponent
      //     },
      //     {
      //         path: 'property/:patientId',
      // component: PropertyComponent
      //     },
      //     {
      //         path: 'pt-visitors/:patientId',
      // component: VisitorsComponent
      //     },
      //     {
      //         path: 'restricted-items/:patientId',
      // component: RestrictedComponent
      //     }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientDetailsRoutingModule { }
