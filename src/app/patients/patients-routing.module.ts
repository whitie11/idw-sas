import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsWardistComponent } from './patients-wardist/patients-wardist.component';

import { AuthGuardService } from '../services/auth-guard';
import { PatientDetailsComponent } from './patient-details/patient-details.component';

const routes: Routes = [
    {
        path: '',
        component: PatientsWardistComponent, canActivate: [AuthGuardService]
    },
    {
        path: 'details',
       // component: PatientDetailsComponent, canActivate: [AuthGuardService]
        loadChildren: () => import('./patient-details/patient-details.module').then(m => m.PatientDetailsModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
