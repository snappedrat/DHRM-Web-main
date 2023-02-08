import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnualPlanningComponent } from './annual-planning/annual-planning.component';
import { MonthlyPlanningComponent } from './monthly-planning/monthly-planning.component';

const routes: Routes = [

  {
    path: 'monthly',
    component: MonthlyPlanningComponent
  },
  {
    path: 'annual',
    component: AnnualPlanningComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeoplePlanningRoutingModule { }
