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
  LineDesc: number;
  PlantCode: string;
  ActiveStatus: string;
  CreatedOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
}

const DUMMY_DATA: master_roster[] = [
  {
    LineDesc: 1,
    PlantCode: "Plant 1",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    LineDesc: 2,
    PlantCode: "Plant 1",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    LineDesc: 3,
    PlantCode: "Plant 1",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    LineDesc: 4,
    PlantCode: "Plant 1",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
];

@Component({
  selector: "app-line",
  templateUrl: "./line.component.html",
  styleUrls: ["./line.component.css"],
})
export class LineComponent implements OnInit {
  displayedColumns: string[] = [
    "LineDesc",
    "PlantCode",
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
    const dialogRef = this.dialog.open(lineForm, {
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
  selector: "line-form",
  templateUrl: "line-form.html",
})
export class lineForm {
  lineForm: FormGroup;
  loading = false;
  year_id = 0;
  constructor(
    public dialogRef: MatDialogRef<lineForm>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    this.lineForm = new FormGroup({
      line_desc: new FormControl("", Validators.required),
      plant_code: new FormControl("", Validators.required),
    });
    // if (this.data != null) {
    //   this.lineForm.patchValue({
    //     year: this.data.year,
    //     status: this.data.status,
    //   });
    //   this.year_id = this.data.year_id;
    // }
  }
}
