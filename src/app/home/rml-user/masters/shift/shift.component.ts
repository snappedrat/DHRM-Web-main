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
  ShiftName: string;
  PlantCode: string;
  StartTime: string;
  EndTime: string;
  ActiveStatus: string;
  CreatedOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
}

const DUMMY_DATA: master_roster[] = [
  {
    ShiftName: "Morning Shift",
    PlantCode: "0001",
    StartTime: "10:00 AM",
    EndTime: "02:00 PM",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    ShiftName: "Evening Shift",
    PlantCode: "0002",
    StartTime: "03:00 AM",
    EndTime: "07:00 PM",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
];

@Component({
  selector: "app-shift",
  templateUrl: "./shift.component.html",
  styleUrls: ["./shift.component.css"],
})
export class ShiftComponent implements OnInit {
  displayedColumns: string[] = [
    "ShiftName",
    "PlantCode",
    "StartTime",
    "EndTime",
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
    const dialogRef = this.dialog.open(shiftForm, {
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
  selector: "shift-form",
  templateUrl: "shift-form.html",
})
export class shiftForm {
  shiftForm: FormGroup;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<shiftForm>,
    @Inject(MAT_DIALOG_DATA) public data: master_roster,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    this.shiftForm = new FormGroup({
      shift_name: new FormControl("", Validators.required),
      plant_code: new FormControl("", Validators.required),
      start_time: new FormControl("", Validators.required),
      end_time: new FormControl("", Validators.required),
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
