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
  Pincode: string;
  Dvisionname: string;
  Regionname: string;
  Circlename: string;
  Taluk: string;
  Districtname: string;
  Statename: string;
  RblZone: string;
  RmlZone: string;
  RapZone: string;
  RevlZone: string;
  RtssLZone: string;
  Statecode: string;
  ActiveStatus: string;
  CreatedOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
}

const DUMMY_DATA: master_roster[] = [
  {
    Pincode: "600006",
    Dvisionname: "Nungambakkam Division",
    Regionname: "Chennai",
    Circlename: "Chennai",
    Taluk: "Chennai",
    Districtname: "Chennai",
    Statename: "Tamil Nadu",
    RblZone: "RBL BANK LIMITED",
    RmlZone: "RML ZONE",
    RapZone: "RAP ZONE",
    RevlZone: "REVL ZONE",
    RtssLZone: "RTSSL Zone",
    Statecode: "StateCode",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    Pincode: "600006",
    Dvisionname: "Nungambakkam Division",
    Regionname: "Chennai",
    Circlename: "Chennai",
    Taluk: "Chennai",
    Districtname: "Chennai",
    Statename: "Tamil Nadu",
    RblZone: "RBL BANK LIMITED",
    RmlZone: "RML ZONE",
    RapZone: "RAP ZONE",
    RevlZone: "REVL ZONE",
    RtssLZone: "RTSSL Zone",
    Statecode: "StateCode",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    Pincode: "600006",
    Dvisionname: "Nungambakkam Division",
    Regionname: "Chennai",
    Circlename: "Chennai",
    Taluk: "Chennai",
    Districtname: "Chennai",
    Statename: "Tamil Nadu",
    RblZone: "RBL BANK LIMITED",
    RmlZone: "RML ZONE",
    RapZone: "RAP ZONE",
    RevlZone: "REVL ZONE",
    RtssLZone: "RTSSL Zone",
    Statecode: "StateCode",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
  {
    Pincode: "600006",
    Dvisionname: "Nungambakkam Division",
    Regionname: "Chennai",
    Circlename: "Chennai",
    Taluk: "Chennai",
    Districtname: "Chennai",
    Statename: "Tamil Nadu",
    RblZone: "RBL BANK LIMITED",
    RmlZone: "RML ZONE",
    RapZone: "RAP ZONE",
    RevlZone: "REVL ZONE",
    RtssLZone: "RTSSL Zone",
    Statecode: "StateCode",
    ActiveStatus: "Yes",
    CreatedOn: "01/01/01",
    CreatedBy: "Mang1",
    ModifiedOn: "01/01/01",
    ModifiedBy: "Mang2",
  },
];

@Component({
  selector: "app-pincode",
  templateUrl: "./pincode.component.html",
  styleUrls: ["./pincode.component.css"],
})
export class PincodeComponent implements OnInit {
  displayedColumns: string[] = [
    "Pincode",
    "Dvisionname",
    "Regionname",
    "Circlename",
    "Taluk",
    "Districtname",
    "Statename",
    "RblZone",
    "RmlZone",
    "RapZone",
    "RevlZone",
    "RtssLZone",
    "Statecode",
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
    const dialogRef = this.dialog.open(pincodeForm, {
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
  selector: "pincode-form",
  templateUrl: "pincode-form.html",
})
export class pincodeForm {
  pincodeForm: FormGroup;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<pincodeForm>,
    @Inject(MAT_DIALOG_DATA) public data: master_roster,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    this.pincodeForm = new FormGroup({
      pincode: new FormControl("", Validators.required),
      dvisionname: new FormControl("", Validators.required),
      regionname: new FormControl("", Validators.required),
      circlename: new FormControl("", Validators.required),
      taluk: new FormControl("", Validators.required),
      districtname: new FormControl("", Validators.required),
      statename: new FormControl("", Validators.required),
      rbl_zone: new FormControl("", Validators.required),
      rml_zone: new FormControl("", Validators.required),
      rap_zone: new FormControl("", Validators.required),
      revl_zone: new FormControl("", Validators.required),
      rtssL_zone: new FormControl("", Validators.required),
      statecode: new FormControl("", Validators.required),
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
