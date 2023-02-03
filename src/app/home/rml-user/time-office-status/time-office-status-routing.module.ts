import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompOffStatusComponent } from './comp-off-status/comp-off-status.component';
import { ForgotPunchStatusComponent } from './forgot-punch-status/forgot-punch-status.component';
import { LeaveStatusComponent } from './leave-status/leave-status.component';
import { OdStatusComponent } from './od-status/od-status.component';
import { OverTimeStatusComponent } from './over-time-status/over-time-status.component';
import { ShiftChangeStatusComponent } from './shift-change-status/shift-change-status.component';

const routes: Routes = [

  {
    path:'over-time-status',
    component:OverTimeStatusComponent
  },
  {
    path:'comp-off-status',
    component:CompOffStatusComponent
  },
  {
    path:'shift-change-status',
    component:ShiftChangeStatusComponent
  },
  {
    path:'forgot-punch-status',
    component:ForgotPunchStatusComponent
  },
  {
    path:'leave-status',
    component:LeaveStatusComponent
  },  
  {
    path:'od-status',
    component:OdStatusComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeOfficeStatusRoutingModule { }
