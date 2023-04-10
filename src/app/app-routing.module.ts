import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./home/rml-user/navbar/navbar.component";
import {AppComponent} from "./app.component";
import { FirstPageComponent } from './first-page/first-page.component';
import { TraineeApplicationComponent } from './home/rml-user/new-joiners/trainee-application/trainee-application.component';
import { FormsComponent } from './home/rml-user/new-joiners/forms/forms.component';
import { IdcardComponent } from './home/rml-user/new-joiners/idcard/idcard.component';
import { TraineeLoginComponent } from './home/rml-user/training-dojo/trainee-login/trainee-login.component';
import { TraineeTestComponent } from './home/rml-user/training-dojo/trainee-test/trainee-test.component';
import { AuthGuard } from './Auth.guard';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import { PermIdcardComponent } from './home/rml-user/new-joiners/perm-idcard/perm-idcard.component';

const routes: Routes = [

  {
    path:"home",
    loadChildren:() => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path:"rml",
    loadChildren:() => import('./home/rml-user/rml-user.module').then(m => m.RmlUserModule)  },
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
    component: FormsComponent, canActivate:[AuthGuard]
  },
  {
    path:'idcard/:status/:mobile/:company',
    component: IdcardComponent
  },
  {
    path:'perm-idcard/:apln_slno',
    component: PermIdcardComponent
  },
  {
    path: 'trainee-login',
    component: TraineeLoginComponent
  },
  {
    path: 'trainee-test/:username',
    component: TraineeTestComponent , canActivate:[AuthGuard]
  },
  {
    path:'',
    component: FirstPageComponent,
  },
  {
    path:'**',
    redirectTo: 'page-not-found',
  },
  {
    path:'page-not-found',
    component: PageNotFoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
