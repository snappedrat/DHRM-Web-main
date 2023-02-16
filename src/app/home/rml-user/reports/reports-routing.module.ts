import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationDueReportComponent } from './evaluation-due-report/evaluation-due-report.component';
import { TestSummaryReportComponent } from './test-summary-report/test-summary-report.component';
import { TraineeAplnReportComponent } from './trainee-apln-report/trainee-apln-report.component';

const routes: Routes = [

  {
    path: 'trainee-apln-report',
    component: TraineeAplnReportComponent
  },
  {
    path: 'evaluation-due-report',
    component: EvaluationDueReportComponent
  },
  {
    path: 'test-summary-report',
    component: TestSummaryReportComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
