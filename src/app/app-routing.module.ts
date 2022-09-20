import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./home/rml-user/navbar/navbar.component";
import {AppComponent} from "./app.component";
import {HomepageComponent} from "./home/homepage/homepage.component";
import { FirstPageComponent } from './first-page/first-page.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
