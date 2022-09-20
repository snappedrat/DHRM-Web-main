import {
  Component,
  OnInit,
  ViewChild,
  Injectable,
  ViewContainerRef,
  TemplateRef,
  NgModule,
  Inject,
} from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import * as XLSX from "xlsx";
import { MatSidenav } from "@angular/material/sidenav";
import { ServiceService } from "../service.service";
import { User } from "../user/user";
import { MatTableModule } from "@angular/material/table";
import { Observable, Subject } from "rxjs";
import { Options } from "selenium-webdriver";
import { Directive, Input } from "@angular/core";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl, FormGroup, Validators } from "@angular/forms";

const material = [MatSidenav, MatTableModule];

export interface master_roster {
  EmployeeName: string;
  Department: string;
  Designation: string;
  MailId: string;
  MobileNo: string;
  UserName: string;
  ActiveStatus: string;
  CreatedOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
}

const DUMMY_DATA: master_roster[] = [
  {
    EmployeeName: "Vignesh",
    Department: "Department",
    Designation: "Designation",
    MailId: "Vignesh@gmail.com",
    MobileNo: "9876543210",
    UserName: "vicky007",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    EmployeeName: "Vignesh",
    Department: "Department",
    Designation: "Designation",
    MailId: "Vignesh@gmail.com",
    MobileNo: "9876543210",
    UserName: "vicky007",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    EmployeeName: "Vignesh",
    Department: "Department",
    Designation: "Designation",
    MailId: "Vignesh@gmail.com",
    MobileNo: "9876543210",
    UserName: "vicky007",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    EmployeeName: "Vignesh",
    Department: "Department",
    Designation: "Designation",
    MailId: "Vignesh@gmail.com",
    MobileNo: "9876543210",
    UserName: "vicky007",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    EmployeeName: "Vignesh",
    Department: "Department",
    Designation: "Designation",
    MailId: "Vignesh@gmail.com",
    MobileNo: "9876543210",
    UserName: "vicky007",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
];

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = [
    "EmployeeName",
    "Department",
    "Designation",
    "MailId",
    "MobileNo",
    "UserName",
    "ActiveStatus",
    "CreatedOn",
    "CreatedBy",
    "ModifiedOn",
    "ModifiedBy",
    "Actions",
  ];
  dataSource = DUMMY_DATA;
  constructor(
    private ServiceService: ServiceService,
    public fb: UntypedFormBuilder,
    private http: HttpClient,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  title = "EXAMPLE MASTER";
  fileName = "COMPANY MASTERS.xlsx";

  exportexcel(): void {
    let element = document.getElementById("table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, this.fileName);
  }

  ngOnInit() {}

  openDialog(): void {
    var data = null;
    const dialogRef = this.dialog.open(employeeForm, {
      minWidth: "40%",
      maxWidth: "40%",
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      //this.animal = result;
    });
  }
}

@Component({
  selector: "employee-form",
  templateUrl: "employee-form.html",
})
export class employeeForm {
  employeeForm: FormGroup;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<employeeForm>,
    @Inject(MAT_DIALOG_DATA) public data: master_roster,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    this.employeeForm = new FormGroup({
      Emp_Name: new FormControl("", Validators.required),
      Department: new FormControl("", Validators.required),
      Designation: new FormControl("", Validators.required),
      Mail_Id: new FormControl("", Validators.required),
      Mobile_No: new FormControl("", Validators.required),
      User_Name: new FormControl("", Validators.required),
      Password: new FormControl("", Validators.required),
      ConfirmPassword: new FormControl("", Validators.required),
    });
    // if (this.data != null) {
    //   this.plantForm.patchValue({
    //     plant_code: this.data.plant_code,
    //     plant_name: this.data.plant_name,
    //     address: this.data.address,
    //   });
    //   this.plant_id = this.data.plant_id;
    // }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
