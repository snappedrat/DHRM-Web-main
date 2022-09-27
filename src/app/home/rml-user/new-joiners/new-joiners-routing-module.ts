import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrApprovalComponent } from './hr-approval/hr-approval.component';
import { TraineeApplicationComponent } from './trainee-application/trainee-application.component';
import { TraineeApplicationStatusComponent } from './trainee-application-status/trainee-application-status.component';
import { FormsComponent } from './forms/forms.component';

const routes: Routes = [
    {
      path:'hr-approval',
      component:HrApprovalComponent
    },
    {
      path:'trainee-application',
      component: TraineeApplicationComponent
    },
    {
      path:'forms/:mobile_no1',
      component: FormsComponent
    },
    {
      path:'trainee-application-status',
      component: TraineeApplicationStatusComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class NewJoinersRoutingModule { }
  