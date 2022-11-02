import { Component, OnInit,ViewChild,Injectable, ViewContainerRef, TemplateRef, NgModule } from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
import { MatSidenav } from '@angular/material/sidenav';
import {ServiceService} from "../service.service";
import {User} from "../user/user";
import { MatTableModule } from '@angular/material/table';
import { Observable,Subject } from 'rxjs';
import { Options } from 'selenium-webdriver';
import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

const material = [MatSidenav, MatTableModule];

export interface master_roster {
  plant_code: string;
  plant_name: string;
  pl: string;
  address: string;
  location: string;
  plant_sign: string;
  personal: string;
  payroll: string;

  CreatedOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
}

const DUMMY_DATA: master_roster[] = [
  // {
  //   PlantCode: "Comp1",
  //   PlantName: "Plant 1",
  //   Location: "Locaiton",
  //   Address: "Chennai",
  //   ActiveStatus: "Yes",
  //   CreatedOn: "01/01/01",
  //   CreatedBy: "Mang1",
  //   ModifiedOn: "01/01/01",
  //   ModifiedBy: "Mang2",
  // },
  // {
  //   PlantCode: "Comp1",
  //   PlantName: "Plant 1",
  //   Location: "Locaiton",
  //   Address: "Chennai",
  //   ActiveStatus: "Yes",
  //   CreatedOn: "01/01/01",
  //   CreatedBy: "Mang1",
  //   ModifiedOn: "01/01/01",
  //   ModifiedBy: "Mang2",
  // },
  // {
  //   PlantCode: "Comp1",
  //   PlantName: "Plant 1",
  //   Location: "Locaiton",
  //   Address: "Chennai",
  //   ActiveStatus: "Yes",
  //   CreatedOn: "01/01/01",
  //   CreatedBy: "Mang1",
  //   ModifiedOn: "01/01/01",
  //   ModifiedBy: "Mang2",
  // },
  // {
  //   PlantCode: "Comp1",
  //   PlantName: "Plant 1",
  //   Location: "Locaiton",
  //   Address: "Chennai",
  //   ActiveStatus: "Yes",
  //   CreatedOn: "01/01/01",
  //   CreatedBy: "Mang1",
  //   ModifiedOn: "01/01/01",
  //   ModifiedBy: "Mang2",
  // },
  // {
  //   PlantCode: "Comp1",
  //   PlantName: "Plant 1",
  //   Location: "Locaiton",
  //   Address: "Chennai",
  //   ActiveStatus: "Yes",
  //   CreatedOn: "01/01/01",
  //   CreatedBy: "Mang1",
  //   ModifiedOn: "01/01/01",
  //   ModifiedBy: "Mang2",
  // },
];

@Component({
  selector: "app-plant",
  templateUrl: "./plant.component.html",
  styleUrls: ["./plant.component.css"],
})
export class PlantComponent implements OnInit {
  displayedColumns: string[] = [
    "PlantCode",
    "PlantName",
    "pl",
    "location",
    "address",
    "personalArea",
    "payrollArea",

    "CreatedOn",
    "CreatedBy",
    "ModifiedOn",
    "ModifiedBy",
    "Actions",
  ];
  dataSource = DUMMY_DATA;

  form: UntypedFormGroup;
  form1:UntypedFormGroup;
  form2:UntypedFormGroup;
  cd=12334;
  showAdd!:boolean;
  showEdit!:boolean;
  users: User[];
  userForm: boolean;
  isNewUser: boolean;
  newUser: any = {};
  editUserForm: boolean;
  editedUser: any = {};
  code:any;
  name:any;
  master:any;
  sno:any;
  errmsg:any;
  plant_code:any;
  plant_name:any;
  pl:any;
  location:any;
  address:any;
  plant_sign:any;
  personal:any;
  payroll:any;
  router: Router;
  isExpanded = true;
  status: boolean = false;
  clickEvent(){
    this.status = !this.status;
  }

  created_byy = this.cookie.get('User_Name');

  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(private cookie: CookieService, private ServiceService: ServiceService,public fb: UntypedFormBuilder, private http: HttpClient) {
    this.form = this.fb.group({

      Code:new UntypedFormControl(' '),
      Name: new UntypedFormControl(' '),
      pl: new UntypedFormControl(' '),
      
      address: new UntypedFormControl(' '),
      location: new UntypedFormControl(' '),
      plant_sign: new UntypedFormControl(' '),
      personal: new UntypedFormControl(' '),
      payroll: new UntypedFormControl(' '),

      created_by: new UntypedFormControl(this.created_byy)

    });
    this.form1 = this.fb.group({
      sno:new UntypedFormControl(' '),
      Name: new UntypedFormControl(' '),
      active_status: new UntypedFormControl(' '),
      modified_on: new UntypedFormControl(' '),
      modified_by: new UntypedFormControl(' '),
    });
    this.form2 = this.fb.group({
      Code:new UntypedFormControl(' '),
      Name: new UntypedFormControl(' '),
      pl: new UntypedFormControl(' '),

      address: new UntypedFormControl(' '),
      location: new UntypedFormControl(' '),
      plant_sign: new UntypedFormControl(' '),
      personal: new UntypedFormControl(' '),
      payroll: new UntypedFormControl(' '),

      modified_on: new UntypedFormControl(' '),
      modified_by: new UntypedFormControl(this.created_byy)
    });
 
  }
  title = "EXAMPLE MASTER";
  fileName = "PLANT MASTERS.xlsx";

  loginUser()
  {

    var formData: any = new FormData();
    formData.append('Code', this.form.get('Code')!.value);
    formData.append('Name', this.form.get('Name')!.value);
    formData.append('pl', this.form.get('pl')!.value);
    formData.append('address', this.form.get('address')!.value);
    formData.append('location', this.form.get('location')!.value);
    formData.append('plant_sign', this.form.get('plant_sign')!.value);
    formData.append('personal', this.form.get('personal')!.value);
    formData.append('payroll', this.form.get('payroll')!.value);

    this.http
        .post('http://localhost:3000/plant',this.form.value)
        .subscribe({
          next: (response) => this.errmsg=response,
          error: (error) => console.log(error),
        })

  }

  exportexcel(): void {
    let element = document.getElementById("table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, this.fileName);
  }

  ngOnInit() {
    this.users = this.getUsers();
  }

  getUsers(): User[]{
    var formData: any = new FormData();
    this.http
        .get('http://localhost:3000/plantshow',this.form.value)
        .subscribe({
          next: (response) =>{ console.log(response); this.master=response},
          error: (error) => console.log(error),
        });
    return this.ServiceService.getUsersFromData();
  }

  showEditUserForm(user: any,plant_code:any,plant_name:any,pl:any,address:any,location:any,plant_sign:any,personal:any,payroll:any) {
    this.showEdit = true;
    this.plant_code=plant_code;
    this.plant_name=plant_name;
    this.pl=pl;
    this.address=address;
    this.location=location;
    this.plant_sign=plant_sign;
    this.personal=personal;
    this.payroll=payroll;

    console.log(this.sno);
    console.log(this.plant_code);
    console.log(this.plant_name);
    if (!user) {
      this.userForm = false;
      return;
    }
    this.editUserForm = true;
    this.editedUser = user;
    this.code=plant_code;
    this.name=plant_name;
    this.pl=pl;
    this.address=address;
    this.location=location;
    this.plant_sign=plant_sign;
    this.personal=personal;
    this.payroll=payroll;
    

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

  hide()
  {
    this.showAdd = false;
  }

  hides()
  {
    this.showEdit = false;
  }

  saveUser(user: User) {
    if (this.isNewUser) {
      // add a new user
      this.ServiceService.addUser(user);
    }
    this.userForm = false;
  }

  updateUser(user: any,plant_code:any,plant_name:any,pl:any,address:any,location:any,plant_sign:any,personal:any,payroll:any) {
    var formData: any = new FormData();
    console.log(this.sno);
    formData.set('sno', this.sno);
    console.log( formData.get('sno'));
    formData.append('Name', this.form2.get('Name')!.value);
    formData.append('pl', this.form.get('pl')!.value);
    formData.append('address', this.form.get('address')!.value);
    formData.append('location', this.form.get('location')!.value);
    formData.append('plant_sign', this.form.get('plant_sign')!.value);
    formData.append('personal', this.form.get('personal')!.value);
    formData.append('payroll', this.form.get('payroll')!.value);
    formData.append('sno', formData.get('sno'));

    var object = {};

    formData.forEach((value: any, key:any) => object[key] = value);
    var json = JSON.stringify(object);
    console.warn(json)

    console.log(object)

    this.http
        .post('http://localhost:3000/plantedit',object)
        .subscribe({
          next: (response) => console.log(response),
          error: (error) => console.log(error),
        });
    return this.ServiceService.updateUser(this.editedUser);
  }

  removeUser(user: any) {
    console.log(user);
    this.http
        .post('http://localhost:3000/plantdel',{"user":user})
        .subscribe({
          next: (response) =>{ console.log(response)},
          error: (error) => console.log(error),
        });
    this.ServiceService.deleteUser(user);
  }

  cancelEdits() {
    this.editedUser = {};
    this.editUserForm = false;
  }
  
  cancelNewUser() {
    this.newUser = {};
    this.userForm = false;
  }
}

// @Component({
//   selector: "plant-form",
//   templateUrl: "plant-form.html",
// })
// export class plantForm {
//   plantForm: FormGroup;
//   loading = false;
//   constructor(
//     public dialogRef: MatDialogRef<plantForm>,
//     @Inject(MAT_DIALOG_DATA) public data: master_roster,
//     private _snackBar: MatSnackBar,
//     private httpClient: HttpClient
//   ) {
//     this.plantForm = new FormGroup({
//       plant_code: new FormControl("", Validators.required),
//       plant_name: new FormControl("", Validators.required),
//       address: new FormControl("", Validators.required),
//     });
//     // if (this.data != null) {
//     //   this.plantForm.patchValue({
//     //     plant_code: this.data.plant_code,
//     //     plant_name: this.data.plant_name,
//     //     address: this.data.address,
//     //   });
//     //   this.plant_id = this.data.plant_id;
//     // }
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
