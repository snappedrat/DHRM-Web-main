import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeOfficeStatusRoutingModule } from './time-office-status-routing.module';
import { ForgotPunchStatusComponent } from './forgot-punch-status/forgot-punch-status.component';
import { ShiftChangeStatusComponent } from './shift-change-status/shift-change-status.component';
import { CompOffStatusComponent } from './comp-off-status/comp-off-status.component';
import { OverTimeStatusComponent } from './over-time-status/over-time-status.component';
import { LeaveStatusComponent } from './leave-status/leave-status.component';
import { OdStatusComponent } from './od-status/od-status.component';
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


@NgModule({
  declarations: [
    ForgotPunchStatusComponent,
    ShiftChangeStatusComponent,
    CompOffStatusComponent,
    OverTimeStatusComponent,
    LeaveStatusComponent,
    OdStatusComponent
  ],
  imports: [
    MatNativeDateModule,
    CommonModule,
    TimeOfficeStatusRoutingModule,
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
export class TimeOfficeStatusModule { }
