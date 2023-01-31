import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillDevelopemntRoutingModule } from './skill-developemnt-routing.module';
import { TrainerEvaluationComponent } from './trainer-evaluation/trainer-evaluation.component';
import {MatIconModule} from "@angular/material/icon";
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TrainerEvaluationComponent
  ],
  imports: [
    CommonModule,
    SkillDevelopemntRoutingModule,
    MatIconModule,
    ReactiveFormsModule

  ]
})
export class SkillDevelopemntModule { }
