import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrApprovalComponent } from './hr-approval/hr-approval.component';
import { TraineeApplicationComponent } from './trainee-application/trainee-application.component';
import { TraineeApplicationStatusComponent } from './trainee-application-status/trainee-application-status.component';
import { FormsComponent } from './forms/forms.component';
import { IdcardComponent } from './idcard/idcard.component';
import { HrViewDataComponent } from './hr-view-data/hr-view-data.component';

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
      path:'forms/:mobile_no1/:apln_status',
      component: FormsComponent
    },
    {
      path:'trainee-application-status',
      component: TraineeApplicationStatusComponent
    },
    {
      path:'idcard/:status',
      component: IdcardComponent
    },
    {
      path:'hr-view',
      component: HrViewDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class NewJoinersRoutingModule { }
  