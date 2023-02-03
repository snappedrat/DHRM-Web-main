import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeOfficeStatusRoutingModule } from './time-office-status-routing.module';
import { ForgotPunchStatusComponent } from './forgot-punch-status/forgot-punch-status.component';
import { ShiftChangeStatusComponent } from './shift-change-status/shift-change-status.component';
import { CompOffStatusComponent } from './comp-off-status/comp-off-status.component';
import { OverTimeStatusComponent } from './over-time-status/over-time-status.component';
import { LeaveStatusComponent } from './leave-status/leave-status.component';
import { OdStatusComponent } from './od-status/od-status.component';


@NgModule({
  declarations: [
    ForgotPunchStatusComponent,
    ShiftChangeStatusComponent,
    CompOffStatusComponent,
    OverTimeStatusComponent,
    LeaveStatusComponent,
    OdStatusComponent
  ],
  imports: [
    CommonModule,
    TimeOfficeStatusRoutingModule
  ]
})
export class TimeOfficeStatusModule { }
