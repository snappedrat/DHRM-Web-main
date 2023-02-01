import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillDevelopemntRoutingModule } from './skill-developemnt-routing.module';
import { TrainerEvaluationComponent } from './trainer-evaluation/trainer-evaluation.component';
import {MatIconModule} from "@angular/material/icon";
import { ReactiveFormsModule } from '@angular/forms';
import { SupervisorEvaluationComponent } from './supervisor-evaluation/supervisor-evaluation.component';
import { EvaluatonDueComponent } from './evaluaton-due/evaluaton-due.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    TrainerEvaluationComponent,
    SupervisorEvaluationComponent,
    EvaluatonDueComponent,
    EvaluationFormComponent
  ],
  imports: [
    CommonModule,
    SkillDevelopemntRoutingModule,
    MatIconModule,
    ReactiveFormsModule

  ]
})
export class SkillDevelopemntModule { }
