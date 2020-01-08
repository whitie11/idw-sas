import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './services/auth-guard';
import { MessagesComponent } from './messages/messages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SasChecksComponent } from './sas-checks/sas-checks.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
    {
        path: 'error',
        component: ErrorPageComponent
    },
    {
        path: 'login',
        component: WelcomeComponent
    },

    {
        path: 'admin',
        component: AdminComponent,
        canActivate : [AuthGuardService]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate : [AuthGuardService]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate : [AuthGuardService]
    },
    {
        path: 'messages',
        component: MessagesComponent,
        canActivate : [AuthGuardService]
    },
    {
        path: 'patients',
        loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule)
    },

     {
        path: 'sas-checks',
        component: SasChecksComponent,
        canActivate : [AuthGuardService]
    },
    // {
    //     path: 'access-denied',
    //     component: AccessDeniedComponent
    // },
    {
        path: '',
        component: WelcomeComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'ignore' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
