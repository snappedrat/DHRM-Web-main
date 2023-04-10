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
import { AuthGuard,  } from 'src/app/home/Guards/Auth.guard';
import { PermIdcardComponent } from './perm-idcard/perm-idcard.component';
import { isHr, isHrAppr, HrPermission } from '../../Guards/newJoiners.guard';

const routes: Routes = [
    {
      path:'hr-approval',
      component:HrApprovalComponent,
      canActivate: [isHrAppr]
    },
    {
      path:'trainee-application',
      component: TraineeApplicationComponent,
    }, 
    {
      path:'onboard',
      component: OnboardComponent,
      canActivate: [HrPermission]

    }, 
    {
      path:'dept_transfer',
      component: DeptTransferComponent,
      canActivate: [HrPermission]

    }, 
    {
      path:'transfer_form/:id/:dept/:line',
      component: TransferFormComponent,
      canActivate: [HrPermission]

    }, 
    {
      path:'onboard_form/:id/:apln_status',
      component: OnboardFormComponent,
      canActivate: [HrPermission]

    }, 
    {
      path:'forms/:mobile_no1/:apln_status/:company',
      component: FormsComponent, 
    },
    {
      path:'trainee-application-status',
      component: TraineeApplicationStatusComponent,
      canActivate: [isHr]

    },

    {
      path:'hr-view/:mobile/:status/:company',
      component: HrViewDataComponent
    },
    
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class NewJoinersRoutingModule { }
  