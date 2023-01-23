import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { TestEvaluationComponent } from './test-evaluation/test-evaluation.component';
import { TestResultSummaryComponent } from './test-result-summary/test-result-summary.component';
import { TraineeAnswerComponent } from './trainee-answer/trainee-answer.component';
import { TraineeOfflineTestComponent } from './trainee-offline-test/trainee-offline-test.component';
import { TraineeScoreCardComponent } from './trainee-score-card/trainee-score-card.component';
import { TrainingModulesComponent } from './training-modules/training-modules.component';

const routes: Routes = [
  {
    path: 'question-bank',
    component: QuestionBankComponent
  },
  {
    path: 'test-evaluation',
    component: TestEvaluationComponent
  },
  {
    path: 'test-result-summary',
    component: TestResultSummaryComponent
  },
  {
    path: 'trainee-score-card/:trainee_idno',
    component: TraineeScoreCardComponent
  },
  {
    path: 'training-modules',
    component: TrainingModulesComponent
  },
  {
    path: 'trainee-answer/:trainee_idno/:module_name',
    component: TraineeAnswerComponent
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingDojoRoutingModule { }
