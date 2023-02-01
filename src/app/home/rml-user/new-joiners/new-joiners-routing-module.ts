import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrApprovalComponent } from './hr-approval/hr-approval.component';
import { TraineeApplicationComponent } from './trainee-application/trainee-application.component';
import { TraineeApplicationStatusComponent } from './trainee-application-status/trainee-application-status.component';
import { FormsComponent } from './forms/forms.component';
import { IdcardComponent } from './idcard/idcard.component';
import { HrViewDataComponent } from './hr-view-data/hr-view-data.component';
import { OnboardComponent } from './onboard/onboard.component';
import { DeptTransferComponent } from './dept-transfer/dept-transfer.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { OnboardFormComponent } from './onboard-form/onboard-form.component';

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
      path:'onboard',
      component: OnboardComponent
    }, 
    {
      path:'dept_transfer',
      component: DeptTransferComponent
    }, 
    {
      path:'transfer_form/:id/:dept/:line',
      component: TransferFormComponent
    }, 
    {
      path:'onboard_form/:id',
      component: OnboardFormComponent
    }, 
    {
      path:'forms/:mobile_no1/:apln_status/:company',
      component: FormsComponent
    },
    {
      path:'trainee-application-status',
      component: TraineeApplicationStatusComponent
    },

    {
      path:'hr-view/:mobile/:status/:company',
      component: HrViewDataComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class NewJoinersRoutingModule { }
  