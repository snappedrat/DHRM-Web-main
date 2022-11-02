import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingDojoRoutingModule } from './training-dojo-routing.module';
import { TrainingModulesComponent } from './training-modules/training-modules.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { TestEvaluationComponent } from './test-evaluation/test-evaluation.component';
import { TestResultSummaryComponent } from './test-result-summary/test-result-summary.component';
import { TraineeScoreCardComponent } from './trainee-score-card/trainee-score-card.component';


@NgModule({
  declarations: [
    TrainingModulesComponent,
    QuestionBankComponent,
    TestEvaluationComponent,
    TestResultSummaryComponent,
    TraineeScoreCardComponent
  ],
  imports: [
    CommonModule,
    TrainingDojoRoutingModule
  ]
})
export class TrainingDojoModule { }
