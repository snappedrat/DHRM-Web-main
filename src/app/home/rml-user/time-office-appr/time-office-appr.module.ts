import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeOfficeApprRoutingModule } from './time-office-appr-routing.module';
import { CompOffApprComponent } from './comp-off-appr/comp-off-appr.component';
import { OverTimeApprComponent } from './over-time-appr/over-time-appr.component';
import { ShiftChangeApprComponent } from './shift-change-appr/shift-change-appr.component';
import { ForgotPunchApprComponent } from './forgot-punch-appr/forgot-punch-appr.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
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
import { OdApprComponent } from './od-appr/od-appr.component';
import { LeaveApprComponent } from './leave-appr/leave-appr.component';


@NgModule({
  declarations: [
    CompOffApprComponent,
    OverTimeApprComponent,
    ShiftChangeApprComponent,
    ForgotPunchApprComponent,
    OdApprComponent,
    LeaveApprComponent
  ],imports: [
    MatNativeDateModule,
    CommonModule,
    TimeOfficeApprRoutingModule,
    CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
    }),
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
    NgxMatTimepickerModule
    
]
})
export class TimeOfficeApprModule { }

