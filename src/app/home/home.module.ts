import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import {RmlUserRoutingModule} from "./rml-user/rml-user-routing.module";



@NgModule({
  declarations: [
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RmlUserRoutingModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class HomeModule { }
