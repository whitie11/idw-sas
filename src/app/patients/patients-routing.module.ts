import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsWardistComponent } from './patients-wardist/patients-wardist.component';

import { AuthGuardService } from '../services/auth-guard';

const routes: Routes = [
    {
        path: '',
        component: PatientsWardistComponent, canActivate: [AuthGuardService]
    },
    // {
    //     path: 'patient-list',
    //     component: PatientsListComponent, canActivate: [AuthGuardService]
    // },
    // {
    //     path: ':id',
    //     loadChildren: './patient-details/patient-details.module#PatientDetailsModule'
    //    // component: PatientDetailsComponent, canActivate: [AuthGuardService]
    // },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
