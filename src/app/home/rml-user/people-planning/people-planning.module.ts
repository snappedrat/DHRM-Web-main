import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeoplePlanningRoutingModule } from './people-planning-routing.module';
import { MonthlyPlanningComponent } from './monthly-planning/monthly-planning.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PeoplePlanningReportComponent } from './people-planning-report/people-planning-report.component';


@NgModule({
  declarations: [
    MonthlyPlanningComponent,
    PeoplePlanningReportComponent,
  ],
  imports: [
    CommonModule,
    PeoplePlanningRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule ,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule

    
  ]
})
export class PeoplePlanningModule { }
