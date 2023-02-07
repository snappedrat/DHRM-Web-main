import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompOffApprComponent } from './comp-off-appr/comp-off-appr.component';
import { ForgotPunchApprComponent } from './forgot-punch-appr/forgot-punch-appr.component';
import { OverTimeApprComponent } from './over-time-appr/over-time-appr.component';
import { ShiftChangeApprComponent } from './shift-change-appr/shift-change-appr.component';

const routes: Routes = [

  {
    path: 'forgot-punch-appr',
    component: ForgotPunchApprComponent
  },
  {
    path: 'shift-change-appr',
    component: ShiftChangeApprComponent
  },
  {
    path: 'over-time-appr',
    component: OverTimeApprComponent
  },
  {
    path: 'comp-off-appr',
    component: CompOffApprComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeOfficeApprRoutingModule { }
