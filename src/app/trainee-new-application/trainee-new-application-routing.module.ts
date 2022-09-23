import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login-form'
  // },
  // {
  //   path:'login-form',
  //   component: LoginFormComponent
  // },
  // {
  //   path:'fill-form',
  //   component: FillFormComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineeNewApplicationRoutingModule { }
