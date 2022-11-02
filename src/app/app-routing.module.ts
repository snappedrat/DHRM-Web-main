import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./home/rml-user/navbar/navbar.component";
import {AppComponent} from "./app.component";
import {HomepageComponent} from "./home/homepage/homepage.component";
import { FirstPageComponent } from './first-page/first-page.component';
import { TraineeApplicationComponent } from './home/rml-user/new-joiners/trainee-application/trainee-application.component';
import { FormsComponent } from './home/rml-user/new-joiners/forms/forms.component';
import { IdcardComponent } from './home/rml-user/new-joiners/idcard/idcard.component';
import { TraineeLoginComponent } from './home/rml-user/training-dojo/trainee-login/trainee-login.component';
const routes: Routes = [
  {
    path:'',
    component:FirstPageComponent,
  },
  {
    path: 'homepage',
    component: HomepageComponent,
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
    path:'trainee-application',
    component: TraineeApplicationComponent
  },
  {
    path:'forms/:mobile_no1/:company',
    component: FormsComponent
  },
  {
    path:'idcard/:status/:mobile/:company',
    component: IdcardComponent
  },
  {
    path: 'trainee-login',
    component: TraineeLoginComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
