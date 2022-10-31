import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {MatRadioModule} from "@angular/material/radio";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {MatIconModule} from "@angular/material/icon";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";

import { TrainingDojoRoutingModule } from './training-dojo-routing.module';
import { TrainingModulesComponent } from './training-modules/training-modules.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { TestEvaluationComponent } from './test-evaluation/test-evaluation.component';
import { TestResultSummaryComponent } from './test-result-summary/test-result-summary.component';
import { TraineeScoreCardComponent } from './trainee-score-card/trainee-score-card.component';
import { TraineeLoginComponent } from './trainee-login/trainee-login.component';


@NgModule({
  declarations: [
    TrainingModulesComponent,
    QuestionBankComponent,
    TestEvaluationComponent,
    TestResultSummaryComponent,
    TraineeScoreCardComponent,
    TraineeLoginComponent
  ],
  imports: [
    CommonModule,
    TrainingDojoRoutingModule,
    FormsModule,
    MatNativeDateModule,
    CommonModule,
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
    NgxMatTimepickerModule,
    FormsModule
  ]
})
export class TrainingDojoModule { }
