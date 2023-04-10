import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/home/Guards/Auth.guard';
import { MasterGuard } from 'src/app/home/Guards/Master.guard';
import { ArsLoginComponent } from './ars-login/ars-login.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { TrainerGuard } from '../Guards/TrainingDojo.guard';
import { TimeOffice, TimeOfficeAppr, TimeOfficeReport } from '../Guards/TimeOffice.guard';
import { CommonPermission } from '../Guards/SkillDev.guard';

const routes: Routes = [
  {
    path:"",
    component:NavbarComponent,canActivate:[AuthGuard],
    children:[
      {
        path:"masters",
        loadChildren:() => import('./masters/masters-routing.module').then(m => m.MastersRoutingModule),
        canActivate: [MasterGuard]
      },
      {
        path:'time_office',
        loadChildren:() => import('./time-office/time-office.module').then(m => m.TimeOfficeModule),
        canActivate: [TimeOffice]
      },
      {
        path:'time_office-status',
        loadChildren:() => import('./time-office-status/time-office-status.module').then(m => m.TimeOfficeStatusModule),
        canActivate: [TimeOffice]
      },
      {
        path:'new_joiners',
        loadChildren:() => import('./new-joiners/new-joiners.module').then(m => m.NewJoinersModule),
      },
      {
        path:'login',
        loadChildren:() => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'training_dojo',
        loadChildren:() => import('./training-dojo/training-dojo.module').then(m => m.TrainingDojoModule),
        canActivate: [TrainerGuard]
      },
      {
        path: 'skill-developement',
        loadChildren:() => import('./skill-developemnt/skill-developemnt.module').then(m => m.SkillDevelopemntModule),
        canActivate: [CommonPermission]
      },
      {
        path: 'time-office-appr',
        loadChildren:() => import('./time-office-appr/time-office-appr.module').then(m => m.TimeOfficeApprModule),
        canActivate: [TimeOfficeAppr]
      },
      {
        path: 'time-office-down',
        loadChildren:() => import('./time-office-down/time-office-down.module').then(m => m.TimeOfficeDownModule),
        canActivate: [TimeOfficeReport]
      },
      {
        path: 'people-planning',
        loadChildren:() => import('./people-planning/people-planning.module').then(m => m.PeoplePlanningModule),
        canActivate: [CommonPermission]

      },
      {
        path: 'reports',
        loadChildren:() => import('./reports/reports.module').then(m => m.ReportsModule),
        canActivate: [CommonPermission]
      },
      ]
  },
  {
    path: 'ars-login',
    component: ArsLoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmlUserRoutingModule { }
