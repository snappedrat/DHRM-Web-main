import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompOffComponent } from './comp-off/comp-off.component';
import { ForgotPunchComponent } from './forgot-punch/forgot-punch.component';
import { OverTimeComponent } from './over-time/over-time.component';
import { ShiftChangeComponent } from './shift-change/shift-change.component';

const routes: Routes = [

  {
    path: 'forgot-punch-down',
    component: ForgotPunchComponent
  },
  {
    path: 'shift-change-down',
    component: ShiftChangeComponent
  },
  {
    path: 'over-time-down',
    component: OverTimeComponent
  },
  {
    path: 'comp-off-down',
    component: CompOffComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeOfficeDownRoutingModule { }
