import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
const routes: Routes = [
  {
    path: "home",
    component: HomepageComponent,
    children: []
  },
  {
    path: "rml",
    loadChildren: () => import('./rml-user/rml-user.module').then(m => m.RmlUserModule)
  }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
