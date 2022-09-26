import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './home/rml-user/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from "@angular/material/menu";
import {MatExpansionModule} from "@angular/material/expansion";
import { HttpClientModule} from "@angular/common/http";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FirstPageComponent } from './first-page/first-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmittedComponent } from './submitted/submitted.component';
import { AlertComponent } from './src/spp/alert/alert.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FirstPageComponent,
    SubmittedComponent,
    AlertComponent,  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule { }
