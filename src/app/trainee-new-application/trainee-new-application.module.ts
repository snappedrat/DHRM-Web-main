import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraineeNewApplicationRoutingModule } from './trainee-new-application-routing.module';
import { FillFormComponent } from './fill-form/fill-form.component';
import { LoginFormComponent } from './login-form/login-form.component';


@NgModule({
  declarations: [
    FillFormComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    TraineeNewApplicationRoutingModule
  ]
})
export class TraineeNewApplicationModule { }
