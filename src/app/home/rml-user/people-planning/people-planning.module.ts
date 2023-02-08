import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeoplePlanningRoutingModule } from './people-planning-routing.module';
import { MonthlyPlanningComponent } from './monthly-planning/monthly-planning.component';
import { AnnualPlanningComponent } from './annual-planning/annual-planning.component';


@NgModule({
  declarations: [
    MonthlyPlanningComponent,
    AnnualPlanningComponent
  ],
  imports: [
    CommonModule,
    PeoplePlanningRoutingModule
  ]
})
export class PeoplePlanningModule { }
