import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeOfficeApprRoutingModule } from './time-office-appr-routing.module';
import { CompOffApprComponent } from './comp-off-appr/comp-off-appr.component';
import { OverTimeApprComponent } from './over-time-appr/over-time-appr.component';
import { ShiftChangeApprComponent } from './shift-change-appr/shift-change-appr.component';
import { ForgotPunchApprComponent } from './forgot-punch-appr/forgot-punch-appr.component';


@NgModule({
  declarations: [
    CompOffApprComponent,
    OverTimeApprComponent,
    ShiftChangeApprComponent,
    ForgotPunchApprComponent
  ],
  imports: [
    CommonModule,
    TimeOfficeApprRoutingModule
  ]
})
export class TimeOfficeApprModule { }
