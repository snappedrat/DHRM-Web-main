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

const material = [
  MatSidenav,
  MatTableModule
];
export interface master_roster{
  company_code: bigint;
  company_name: string;
  del_status: boolean;
  active_status: string;
  created_on: Date;
  modified_on: Date;
  modified_by: string;
}
const DUMMY_DATA: master_roster[] = [];
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  displayedColumns: string[] = ['CompanyCode','CompanyName', 'ActiveStatus', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'];
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
  company_code:any;
  company_name:any;
  active_status:any;
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
      active_status: new UntypedFormControl(' '),
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
      active_status: new UntypedFormControl(' '),
      modified_on: new UntypedFormControl(' '),
      modified_by: new UntypedFormControl(this.created_byy)
    });
  }
  title = 'EXAMPLE MASTER';
  fileName='COMPANY MASTERS.xlsx';

  created_by = this.cookie.get('User_Name');

  loginUser()
  {
  
    console.log(this.form.get('active_status')!.value);

    var formData: any = new FormData();
    formData.append('Code', this.form.get('Code')!.value);
    formData.append('Name', this.form.get('Name')!.value);
    formData.append('active_status', this.form.get('active_status')!.value);
    this.http
        .post('http://localhost:3000/user',this.form.value)
        .subscribe({
          next: (response) => this.errmsg=response,
          error: (error) => console.log(error),
        })

  }
  exportexcel(): void
  {
    let element = document.getElementById('table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  ngOnInit() {
    this.users = this.getUsers();
  }

  getUsers(): User[]{
    var formData: any = new FormData();
    console.log(this.form.value)
    this.http
        .get('http://localhost:3000/usershow',this.form.value)
        .subscribe({
          next: (response) =>{ console.log(response); this.master=response},
          error: (error) => console.log(error),
        });
    return this.ServiceService.getUsersFromData();
  }

  showEditUserForm(user: any,company_code:any,company_name:any,active_status:any) {
    this.showEdit = true;
    this.sno=user;
    this.company_code=company_code;
    this.company_name=company_name;
    this.active_status=active_status;
    console.log(this.sno);
    console.log(this.company_code);
    console.log(this.company_name);
    if (!user) {
      this.userForm = false;
      return;
    }
    this.editUserForm = true;
    this.editedUser = user;
    this.code=company_code;
    this.name=company_name;
    this.status=active_status;

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

  updateUser(sno:any,Code:any,Name:any,active_status:any) {
    var formData: any = new FormData();
    console.log(this.sno);
    formData.set('sno', this.sno);
    console.log( formData.get('sno'));
    formData.append('Name', this.form2.get('Name')!.value);
    formData.append('active_status', this.form2.get('active_status')!.value);
    formData.append('modified_by', this.form2.get('modified_by')!.value);
    formData.append('sno', formData.get('sno'));

    var object = {};

    formData.forEach((value: any, key:any) => object[key] = value);
    var json = JSON.stringify(object);
    console.warn(json)

    console.log(object)

    this.http
        .post('http://localhost:3000/useredit',object)
        .subscribe({
          next: (response) => console.log(response),
          error: (error) => console.log(error),
        });
    return this.ServiceService.updateUser(this.editedUser);
  }

  removeUser(user: any) {
    console.log(user);
    this.http
        .post('http://localhost:3000/userdel',{"user":user})
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
