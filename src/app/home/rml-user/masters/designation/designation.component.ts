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
  DesignationName: string;
  PlantName: string;
  ActiveStatus: string;
  CreatedOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
}

const DUMMY_DATA: master_roster[] = [
  {
    DesignationName: "Comp1",
    PlantName: "Plant 1",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    DesignationName: "Comp1",
    PlantName: "Plant 1",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    DesignationName: "Comp1",
    PlantName: "Plant 1",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    DesignationName: "Comp1",
    PlantName: "Plant 1",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    DesignationName: "Comp1",
    PlantName: "Plant 1",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
];

@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.css"],
})
export class DesignationComponent implements OnInit {
  displayedColumns: string[] = [
    "DesignationName",
    "PlantName",
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

  ngOnInit(): void {}

  openDialog(): void {
    var data = null;
    const dialogRef = this.dialog.open(designationForm, {
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
  selector: "designation-form",
  templateUrl: "designation-form.html",
})
export class designationForm {
  designationForm: FormGroup;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<designationForm>,
    @Inject(MAT_DIALOG_DATA) public data: master_roster,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    this.designationForm = new FormGroup({
      desig_name: new FormControl("", Validators.required),
      plant_code: new FormControl("", Validators.required),
    });
    // if (this.data != null) {
    //   this.designationForm.patchValue({
    //     designation_code: this.data.designation_code,
    //     designation_name: this.data.designation_name,
    //     address: this.data.address,
    //   });
    //   this.designation_id = this.data.designation_id;
    // }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
