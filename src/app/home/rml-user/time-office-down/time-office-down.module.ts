import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeOfficeDownRoutingModule } from './time-office-down-routing.module';
import { ForgotPunchComponent } from './forgot-punch/forgot-punch.component';
import { CompOffComponent } from './comp-off/comp-off.component';
import { OverTimeComponent } from './over-time/over-time.component';
import { ShiftChangeComponent } from './shift-change/shift-change.component';
import { OnDutyComponent } from './on-duty/on-duty.component';
import { LeaveComponent } from './leave/leave.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ForgotPunchComponent,
    CompOffComponent,
    OverTimeComponent,
    ShiftChangeComponent,
    OnDutyComponent,
    LeaveComponent
  ],
  imports: [
    CommonModule,
    TimeOfficeDownRoutingModule,
    MatIconModule
  ]
})
export class TimeOfficeDownModule { }
