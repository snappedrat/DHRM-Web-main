import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {CompanyComponent} from "./masters/company/company.component";
import { SkillDevelopemntModule } from './skill-developemnt/skill-developemnt.module';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path:"",
    component:NavbarComponent,
    
    children:[
      {
        path:"masters",
        loadChildren:() => import('./masters/masters-routing.module').then(m => m.MastersRoutingModule)
      },
      {
        path:'time_office',
        loadChildren:() => import('./time-office/time-office.module').then(m => m.TimeOfficeModule)
      },
      {
        path:'time_office-status',
        loadChildren:() => import('./time-office-status/time-office-status.module').then(m => m.TimeOfficeStatusModule)
      },
      {
        path:'new_joiners',
        loadChildren:() => import('./new-joiners/new-joiners.module').then(m => m.NewJoinersModule)
      },
      {
        path:'login',
        loadChildren:() => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'training_dojo',
        loadChildren:() => import('./training-dojo/training-dojo.module').then(m => m.TrainingDojoModule)
      },
      {
        path: 'skill-developement',
        loadChildren:() => import('./skill-developemnt/skill-developemnt.module').then(m => m.SkillDevelopemntModule)
      },
      {
        path: 'time-office-appr',
        loadChildren:() => import('./time-office-appr/time-office-appr.module').then(m => m.TimeOfficeApprModule)
      },
      {
        path:'reports',
        component: ReportsComponent
      }
      ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmlUserRoutingModule { }
