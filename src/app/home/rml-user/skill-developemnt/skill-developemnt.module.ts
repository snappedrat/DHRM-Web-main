import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillDevelopemntRoutingModule } from './skill-developemnt-routing.module';
import { TrainerEvaluationComponent } from './trainer-evaluation/trainer-evaluation.component';
import {MatIconModule} from "@angular/material/icon";
import { SupervisorEvaluationComponent } from './supervisor-evaluation/supervisor-evaluation.component';
import { EvaluatonDueComponent } from './evaluaton-due/evaluaton-due.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    TrainerEvaluationComponent,
    SupervisorEvaluationComponent,
    EvaluatonDueComponent,
    EvaluationFormComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SkillDevelopemntRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatTableModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatIconModule,
    FormsModule,

  ]
})
export class SkillDevelopemntModule { }
