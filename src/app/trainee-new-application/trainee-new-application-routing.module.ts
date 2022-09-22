import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { FillFormComponent } from './fill-form/fill-form.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login-form'
  // },
  {
    path:'login-form',
    component: LoginFormComponent
  },
  {
    path:'fill-form',
    component: FillFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineeNewApplicationRoutingModule { }
