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
  firstName: string;
  lastName: string;
  dateofbirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  ActiveStatus: string;
  CreatedOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
}

const DUMMY_DATA: master_roster[] = [
  {
    firstName: "First Name",
    lastName: "Last Name",
    dateofbirth: "17/07/1993",
    gender: "Male",
    address: "Nungampakkam",
    city: "Chennai",
    state: "Tamil Nadu",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    firstName: "First Name",
    lastName: "Last Name",
    dateofbirth: "17/07/1993",
    gender: "Male",
    address: "Nungampakkam",
    city: "Chennai",
    state: "Tamil Nadu",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    firstName: "First Name",
    lastName: "Last Name",
    dateofbirth: "17/07/1993",
    gender: "Male",
    address: "Nungampakkam",
    city: "Chennai",
    state: "Tamil Nadu",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    firstName: "First Name",
    lastName: "Last Name",
    dateofbirth: "17/07/1993",
    gender: "Male",
    address: "Nungampakkam",
    city: "Chennai",
    state: "Tamil Nadu",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
];

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "dateofbirth",
    "gender",
    "address",
    "city",
    "state",
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
    const dialogRef = this.dialog.open(userForm, {
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
  selector: "user-form",
  templateUrl: "user-form.html",
})
export class userForm {
  userForm: FormGroup;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<userForm>,
    @Inject(MAT_DIALOG_DATA) public data: master_roster,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    this.userForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      dateofbirth: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
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
