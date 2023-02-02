import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeOfficeRoutingModule } from './time-office-routing.module';
import { CalenderComponent } from './calender/calender.component';
import { ShiftChangeComponent } from './shift-change/shift-change.component';
import { ForgetPunchComponent } from './forget-punch/forget-punch.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { OdComponent } from './od/od.component';
import { LeaveComponent } from './leave/leave.component';
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
import { DeptTransferComponent } from './dept-transfer/dept-transfer.component';
import { OverTimeComponent } from './over-time/over-time.component';
import { CompOffComponent } from './comp-off/comp-off.component';


@NgModule({
  declarations: [
    CalenderComponent,
    ShiftChangeComponent,
    ForgetPunchComponent,
    AttendanceComponent,
    OdComponent,
    LeaveComponent,
    DeptTransferComponent,
    OverTimeComponent,
    CompOffComponent
  ],
    imports: [
        MatNativeDateModule,
        CommonModule,
        TimeOfficeRoutingModule,
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
export class TimeOfficeModule { }
