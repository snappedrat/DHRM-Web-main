import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AttendanceComponent} from "./attendance/attendance.component";
import {CalenderComponent} from "./calender/calender.component";
import {ForgetPunchComponent} from "./forget-punch/forget-punch.component";
import {ShiftChangeComponent} from "./shift-change/shift-change.component";
import {LeaveComponent} from "./leave/leave.component";
import { DeptTransferComponent } from './dept-transfer/dept-transfer.component';
import {OdComponent} from "./od/od.component";

const routes: Routes = [
  {
    path:'attendance',
    component:AttendanceComponent
  },
  {
    path:'calender',
    component:CalenderComponent
  },
  {
    path:'forget_punch',
    component:ForgetPunchComponent
  },
  {
    path:'leave',
    component:LeaveComponent
  },
  {
    path:'od',
    component:OdComponent
  },
  {
    path:'shift_change',
    component:ShiftChangeComponent
  },
  {
    path:'dept_transfer',
    component:DeptTransferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeOfficeRoutingModule { }
