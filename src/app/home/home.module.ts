import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {RmlUserRoutingModule} from "./rml-user/rml-user-routing.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
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
