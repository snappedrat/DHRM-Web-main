import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {CompanyComponent} from "./masters/company/company.component";

const routes: Routes = [
  {
    path:"",
    component:NavbarComponent,
    children:[
      {
        path:"masters",
        loadChildren:() => import('./masters/masters-routing.module').then(m => m.MastersRoutingModule)
      },
      {
        path:'time_office',
        loadChildren:() => import('./time-office/time-office.module').then(m => m.TimeOfficeModule)
      },
      {
        path:'new_joiners',
        loadChildren:() => import('./new-joiners/new-joiners.module').then(m => m.NewJoinersModule)
      },
      {
        path:'login',
        loadChildren:() => import('./login/login.module').then(m => m.LoginModule)
      },
      ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmlUserRoutingModule { }
