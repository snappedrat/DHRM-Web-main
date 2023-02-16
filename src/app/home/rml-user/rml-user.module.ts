import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RmlUserRoutingModule } from './rml-user-routing.module';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { CompanyComponent } from "./masters/company/company.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { DeptComponent } from "./masters/dept/dept.component";
import { MatTableModule } from "@angular/material/table";
import { MatDividerModule } from "@angular/material/divider";
import { PlantComponent } from './masters/plant/plant.component';
import { LineComponent } from './masters/line/line.component';
import { DesignationComponent } from './masters/designation/designation.component';
import { TraineecategoryComponent} from './masters/traineecategory/traineecategory.component';
import { UserComponent, userForm } from './masters/user/user.component';
import { BankComponent } from './masters/bank/bank.component';
import {LoginModule} from "./login/login.module";
import { OperationsComponent } from './masters/operations/operations.component';
import { PincodeComponent} from './masters/pincode/pincode.component';
import { EmployeeComponent} from './masters/employee/employee.component';
import { ShiftComponent} from './masters/shift/shift.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SkillDevelopemntModule } from './skill-developemnt/skill-developemnt.module';
import { ArsLoginComponent } from './ars-login/ars-login.component';


@NgModule({
  declarations: [
    CompanyComponent,
    DeptComponent,
    PlantComponent,
    LineComponent,
    DesignationComponent,
    TraineecategoryComponent,
    UserComponent,
    userForm,
    BankComponent,
    OperationsComponent,
    PincodeComponent,
    EmployeeComponent,
    ShiftComponent,
    ArsLoginComponent,

  ],
  imports: [
    CommonModule,
    LoginModule,
    RmlUserRoutingModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    FlexLayoutModule,
    SkillDevelopemntModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class RmlUserModule { }
