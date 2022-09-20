import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginModule} from "../login/login.module";
import { NewJoinersRoutingModule } from './new-joiners-routing-module';
import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {MatRadioModule} from "@angular/material/radio";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {MatIconModule} from "@angular/material/icon";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import { HrApprovalComponent } from './hr-approval/hr-approval.component';
import { TraineeApplicationComponent } from './trainee-application/trainee-application.component';
import { FormsComponent } from './forms/forms.component';
import { BasicComponent } from './forms/basic/basic.component';
import { BanksComponent } from './forms/banks/banks.component';
import { EducationalComponent } from './forms/educational/educational.component';
import { PrevComponent } from './forms/prev/prev.component';
import { OtherComponent } from './forms/other/other.component';
import { FormsModule } from '@angular/forms';
import { FamilyDetailComponent } from './forms/family-detail/family-detail.component';
import { EmergencyComponent } from './forms/emergency/emergency.component';
@NgModule({
    declarations: [
        HrApprovalComponent,
        TraineeApplicationComponent,
        FormsComponent,
        BasicComponent,
        BanksComponent,
        EducationalComponent,
        PrevComponent,
        OtherComponent,
        FamilyDetailComponent,
        EmergencyComponent,
    ],
      imports: [
          LoginModule,
          MatNativeDateModule,
          CommonModule,
          NewJoinersRoutingModule,
          MatDividerModule,
          MatTableModule,
          MatRadioModule,
          ReactiveFormsModule,
          MatButtonModule,
          MatFormFieldModule,
          MatDatepickerModule,
          MatInputModule,
          MatSelectModule,
          MatStepperModule,
          MatIconModule,
          NgxMatTimepickerModule,
          FormsModule
      ]
  })
  export class NewJoinersModule { }
