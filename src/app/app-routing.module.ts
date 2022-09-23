import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./home/rml-user/navbar/navbar.component";
import {AppComponent} from "./app.component";
import {HomepageComponent} from "./home/homepage/homepage.component";
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginFormComponent } from './trainee-new-application/login-form/login-form.component';
import { FillFormComponent } from './trainee-new-application/fill-form/fill-form.component';

import { TraineeApplicationComponent } from './home/rml-user/new-joiners/trainee-application/trainee-application.component';
import { FormsComponent } from './home/rml-user/new-joiners/forms/forms.component';
const routes: Routes = [
  {
    path:'',
    component:FirstPageComponent,
  },
  {
    path:"home",
    loadChildren:() => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path:"rml",
    loadChildren:() => import('./home/rml-user/rml-user.module').then(m => m.RmlUserModule)
  },
  {
    path:'first',
    component:FirstPageComponent,
  },
  {
    path: 'login',
    component : LoginFormComponent,
  },
  {
    path: 'fill',
    component : FillFormComponent,
  },
  {
    path:'trainee-application',
    component: TraineeApplicationComponent
  },
  {
    path:'forms',
    component: FormsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
