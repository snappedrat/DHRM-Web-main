import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRouteSnapshot, RouteReuseStrategy } from '@angular/router';
import { TrainerEvaluationComponent } from './trainer-evaluation/trainer-evaluation.component';
import {MatIconModule} from "@angular/material/icon";
import { SupervisorEvaluationComponent } from './supervisor-evaluation/supervisor-evaluation.component';
import { EvaluatonDueComponent } from './evaluaton-due/evaluaton-due.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';

// export class CustomRouteReuseStrategy extends RouteReuseStrategy {

//   shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
//     return false;
//   }


const routes: Routes = [
  {
    path:'trainer-evaluation',
    component:TrainerEvaluationComponent,
    data: {reuse : false}
  },
  {
    path:'supervisor-evaluation',
    component:SupervisorEvaluationComponent
  },  {
    path:'evaluation-due',
    component:EvaluatonDueComponent
  },
  {
    path:'evaluation-form/:id/:nav',
    component: EvaluationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillDevelopemntRoutingModule {

 }
