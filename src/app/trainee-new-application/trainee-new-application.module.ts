import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraineeNewApplicationRoutingModule } from './trainee-new-application-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { BankComponent } from './fill-form/bank/bank.component';
import { BasicComponent } from './fill-form/basic/basic.component';
import { EducationalComponent } from './fill-form/educational/educational.component';
import { EmergencyComponent } from './fill-form/emergency/emergency.component';
import { FamilyDetailComponent } from './fill-form/family-detail/family-detail.component';
import { OtherComponent } from './fill-form/other/other.component';
import { PrevComponent } from './fill-form/prev/prev.component';
import { LanguageComponent } from './fill-form/language/language.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsComponent } from '../home/rml-user/new-joiners/forms/forms.component';

import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {MatIconModule} from "@angular/material/icon";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";



@NgModule({
  declarations: [
    FillFormComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TraineeNewApplicationRoutingModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTableModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatIconModule,
    NgxMatTimepickerModule,
  ]

// })
// export class TraineeNewApplicationModule { }
