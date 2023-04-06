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
import { OtherComponent } from './forms/other/other.component';
import { FormsModule } from '@angular/forms';
import { EmergencyComponent } from './forms/emergency/emergency.component';
import { LanguageComponent } from './forms/language/language.component';
import { TraineeApplicationStatusComponent } from './trainee-application-status/trainee-application-status.component';
import { IdcardComponent } from './idcard/idcard.component';
import { HrViewDataComponent } from './hr-view-data/hr-view-data.component';
import { FamilyEditComponent } from './forms/family-edit/family-edit.component';
import { EducationEditComponent } from './forms/education-edit/education-edit.component';
import { PrevEditComponent } from './forms/prev-edit/prev-edit.component';
import { ChooseFilesComponent } from './forms/choose-files/choose-files.component';
import { OnboardComponent } from './onboard/onboard.component';
import { DeptTransferComponent } from './dept-transfer/dept-transfer.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { OnboardFormComponent } from './onboard-form/onboard-form.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { DateRangeFilterPipe } from '../dateFilter.pipe';
import { AuthGuard } from 'src/app/Auth.guard';
import { PermIdcardComponent } from './perm-idcard/perm-idcard.component';
import { FilterPipe } from '../filter.pipe';


@NgModule({
    declarations: [
        HrApprovalComponent,
        TraineeApplicationComponent,
        FormsComponent,
        BasicComponent,
        BanksComponent,
        DateRangeFilterPipe,
        OtherComponent,
        EmergencyComponent,
        LanguageComponent,
        TraineeApplicationStatusComponent,
        IdcardComponent,
        HrViewDataComponent,
        FamilyEditComponent,
        EducationEditComponent,
        PrevEditComponent,
        ChooseFilesComponent,
        OnboardComponent,
        DeptTransferComponent,
        TransferFormComponent,
        OnboardFormComponent,
        PermIdcardComponent,
        FilterPipe
    ],
      imports: [
          CommonModule,
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
          FormsModule,
          NgbPaginationModule

      ],
      providers:
      [AuthGuard]
  })
  export class NewJoinersModule { }
