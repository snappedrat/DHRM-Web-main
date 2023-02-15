import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyPlanningComponent } from './monthly-planning/monthly-planning.component';
import { PeoplePlanningReportComponent } from './people-planning-report/people-planning-report.component';

const routes: Routes = [

  {
    path: 'monthly',
    component: MonthlyPlanningComponent
  },
  {
    path: 'actualxplanned',
    component: PeoplePlanningReportComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeoplePlanningRoutingModule { }
