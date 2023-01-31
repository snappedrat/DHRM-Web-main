import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerEvaluationComponent } from './trainer-evaluation/trainer-evaluation.component';
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {
    path:'trainer-evaluation',
    component:TrainerEvaluationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillDevelopemntRoutingModule {

 }
