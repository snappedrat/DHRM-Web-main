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
  PlantCode: string,
  OperationsDescription: string;
  LineCode: string;
  SkillLevel: string;
  CriticalDescription: string;
  ActiveStatus: string;
  CreatedOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
}

const DUMMY_DATA: master_roster[] = [
  {
    PlantCode: "A0001",
    OperationsDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    LineCode: "00001",
    SkillLevel: "Level 1",
    CriticalDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    PlantCode: "S0001",
    OperationsDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    LineCode: "00001",
    SkillLevel: "Level 1",
    CriticalDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    PlantCode: "F0001",
    OperationsDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    LineCode: "00001",
    SkillLevel: "Level 1",
    CriticalDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    PlantCode: "G0001",
    OperationsDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    LineCode: "00001",
    SkillLevel: "Level 1",
    CriticalDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    PlantCode: "BH0001",
    OperationsDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    LineCode: "00001",
    SkillLevel: "Level 1",
    CriticalDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    PlantCode: "V0001",
    OperationsDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    LineCode: "00001",
    SkillLevel: "Level 1",
    CriticalDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
];

@Component({
  selector: "app-operations",
  templateUrl: "./operations.component.html",
  styleUrls: ["./operations.component.css"],
})
export class OperationsComponent implements OnInit {
  displayedColumns: string[] = [
    "PlantCode",
    "OperationsDescription",
    "LineCode",
    "SkillLevel",
    "CriticalDescription",
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
    const dialogRef = this.dialog.open(operationsForm, {
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
  selector: "operations-form",
  templateUrl: "operations-form.html",
})
export class operationsForm {
  operationsForm: FormGroup;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<operationsForm>,
    @Inject(MAT_DIALOG_DATA) public data: master_roster,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    this.operationsForm = new FormGroup({
      plant_code: new FormControl("", Validators.required),
      oprn_desc: new FormControl("", Validators.required),
      line_code: new FormControl("", Validators.required),
      skill_level: new FormControl("", Validators.required),
      critical_oprn: new FormControl("", Validators.required),
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
