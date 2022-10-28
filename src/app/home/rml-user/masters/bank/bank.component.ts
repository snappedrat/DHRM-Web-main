import {Component, OnInit, ViewChild, Injectable, ViewContainerRef, TemplateRef, NgModule, Inject,} from "@angular/core";
import {UntypedFormGroup, UntypedFormControl, UntypedFormBuilder,} from "@angular/forms";
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
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl, FormGroup, Validators } from "@angular/forms";
const material = [MatSidenav, MatTableModule];
export interface master_roster {
  BankName: string;
  ActiveStatus: string;
  CreatedOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
}
const DUMMY_DATA: master_roster[] = [
];
@Component({
  selector: "app-bank",
  templateUrl: "./bank.component.html",
  styleUrls: ["./bank.component.css"],
})
export class BankComponent implements OnInit {
  displayedColumns: string[] = [
    "BankName",
    "ActiveStatus",
    "CreatedOn",
    "CreatedBy",
    "ModifiedOn",
    "ModifiedBy",
    "Actions",
  ];
  dataSource = DUMMY_DATA;
  form: UntypedFormGroup;
  form1:UntypedFormGroup;
  showAdd:boolean;
  showEdit:boolean;
  users: User[];
  userForm: boolean;
  isNewUser: boolean;
  newUser: any = {};
  editUserForm: boolean;
  editedUser: any = {};
  master:any;
  sno:any;
  router:Router;
  bank_name: any=['AXIS BANK','ICICI BANK','KOTAK BANK','STATE BANK OF INDIA','TMB BANK','INDUSLAND BANK']
  isExpanded = true;
  status: boolean = false;
  clickEvent(){
    this.status = !this.status;
  }
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  constructor(
    private ServiceService: ServiceService,
    public fb: UntypedFormBuilder,
    private http: HttpClient,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      bank_name:        new UntypedFormControl(' '),
      active_status:    new UntypedFormControl(' '),
    });


  }
  title = "EXAMPLE MASTER";
  fileName = "COMPANY MASTERS.xlsx";

  exportexcel(): void {
    let element = document.getElementById("table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, this.fileName);
  }
  loginUser()
  {
    console.log(this.form.get('bank_name')!.value);
    var formData: any = new FormData();
    formData.append('bank_name', this.form.get('bank_name')!.value);
    formData.append('active_status', this.form.get('active_status')!.value);
    this.http
        .post(' http://localhost:3000/bank',this.form.value)
        .subscribe({
          next: (response) => console.log(response),
          error: (error) => console.log(error),
        });
  }
  hide()
  {
    this.showAdd = false;
  }

  ngOnInit() {
    this.users = this.getUsers();
  }
  getUsers(): User[]{
    var formData: any = new FormData();
    this.http
        .get(' http://localhost:3000/bankshow',this.form.value)
        .subscribe({
          next: (response) =>{ console.log(response); this.master=response},
          error: (error) => console.log(error),
        });
    return this.ServiceService.getUsersFromData();
  }
  showAddUserForm() {
    // resets form if edited user
    this.showAdd = true;
    if (this.users) {
      this.newUser = {};
    }
    this.userForm = true;
    this.isNewUser = true;
  }
  showEditUserForm(user: any) {
    this.showEdit = true;
    this.sno=user;
    console.log(this.sno);
    if (!user) {
      this.userForm = false;
      return;
    }
    this.editUserForm = true;
    this.editedUser = user;
  }
  openDialog(): void {
    var data = null;
    const dialogRef = this.dialog.open(bankForm, {
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
  selector: "bank-form",
  templateUrl: "bank-form.html",
})
export class bankForm {
  bankForm: FormGroup;
  loading = false;
  form1:UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<bankForm>,
    public fb:UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: master_roster,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    this.form1 = this.fb.group({
      sno:              new UntypedFormControl(' '),
      bank_name:        new UntypedFormControl(' '),
      active_status:    new UntypedFormControl(' '),
      modified_on:      new UntypedFormControl(' '),
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
