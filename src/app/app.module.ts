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
import { TraineeNewApplicationComponent } from './trainee-new-application/trainee-new-application.component';
import { LoginFormComponent } from './trainee-new-application/login-form/login-form.component';
import { FillFormComponent } from './trainee-new-application/fill-form/fill-form.component';
import { BankComponent } from './trainee-new-application/fill-form/bank/bank.component';
import { BasicComponent } from './trainee-new-application/fill-form/basic/basic.component';
import { EducationalComponent } from './trainee-new-application/fill-form/educational/educational.component';
import { EmergencyComponent } from './trainee-new-application/fill-form/emergency/emergency.component';
import { FamilyDetailComponent } from './trainee-new-application/fill-form/family-detail/family-detail.component';
import { OtherComponent } from './trainee-new-application/fill-form/other/other.component';
import { PrevComponent } from './trainee-new-application/fill-form/prev/prev.component';













@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FirstPageComponent,
    TraineeNewApplicationComponent,
    LoginFormComponent,
    FillFormComponent,
    BankComponent,
    BasicComponent,
    EducationalComponent,
    EmergencyComponent,
    FamilyDetailComponent,
    OtherComponent,
    PrevComponent,





  
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
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule { }
