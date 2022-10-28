import { Component, OnInit,ViewChild,Injectable, ViewContainerRef, TemplateRef  } from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import {Router} from '@angular/router';
import { Options } from 'selenium-webdriver';
import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as XLSX from 'xlsx';
import { MatTableModule } from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';
import {ServiceService} from "../service.service";
import{User} from "../user/user";

const material = [
  MatSidenav,
  MatTableModule
];

export interface department_roster{
  PlantCode: string;
  DepartmentName: string;
  SAPCode: string;
  ActiveStatus: string;
  CreatedOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
}
const DUMMY_DATA: department_roster[] = [
  {PlantCode: 'PL1', DepartmentName: 'Dept1', SAPCode: '1212', ActiveStatus: 'Yes', CreatedOn: '01/01/01', CreatedBy: 'Mang1', ModifiedOn: '01/01/01', ModifiedBy: 'Mang2'},
  {PlantCode: 'PL1', DepartmentName: 'Dept1', SAPCode: '1212', ActiveStatus: 'Yes', CreatedOn: '01/01/01', CreatedBy: 'Mang1', ModifiedOn: '01/01/01', ModifiedBy: 'Mang2'},
  {PlantCode: 'PL1', DepartmentName: 'Dept1', SAPCode: '1212', ActiveStatus: 'Yes', CreatedOn: '01/01/01', CreatedBy: 'Mang1', ModifiedOn: '01/01/01', ModifiedBy: 'Mang2'},
];

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent implements OnInit {
  @ViewChild('sidenav',{static: false}) sidenav!: MatSidenav;
  form: UntypedFormGroup;
  form1:UntypedFormGroup;
  displayedColumns: string[] = ['PlantCode', 'DepartmentName', 'SAPCode', 'ActiveStatus', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'];
  dataSource = DUMMY_DATA;
  showAdd!:boolean;
  showEdit!:boolean;
  users!: User[];
  userForm!: boolean;
  isNewUser!: boolean;
  newUser: any = {};
  editUserForm!: boolean;
  editedUser: any = {};
  master:any;
  sno:any;
  router!:Router;
  plant_code: any=['1000','1001','2000','2001','3000','3001']
  isExpanded = true;
  status: boolean = false;
  clickEvent(){
    this.status = !this.status;
  }
  constructor(private ServiceService: ServiceService,public fb: UntypedFormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      dept_name:      new UntypedFormControl(' '),
      plant_code:     new UntypedFormControl(' '),
      sap_code:       new UntypedFormControl(' '),
      active_status:  new UntypedFormControl(' '),
      creted_by: new UntypedFormControl(' '),
    });

    this.form1 = this.fb.group({
      sno:         new UntypedFormControl(' '),
      plant_code:  new UntypedFormControl(' '),
      sap_code:    new UntypedFormControl(' '),
      active_status:      new UntypedFormControl(' '),
      modified_on: new UntypedFormControl(' '),
    });
  }

  title = 'EXAMPLE MASTER';
  fileName='DEPARTMENT MASTERS.xlsx';
  loginUser()
  {
    console.log(this.form.get('active_status')!.value);
    var formData: any = new FormData();
    formData.append('dept_name', this.form.get('dept_name')!.value);
    formData.append('plant_code', this.form.get('plant_code')!.value);
    formData.append('sap_code', this.form.get('sap_code')!.value);
    formData.append('active_status', this.form.get('active_status')!.value);
    formData.append('creted_by', this.form.get('creted_by')!.value);
    this.http
      .post(' http://localhost:3000/dept',this.form.value)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
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
    this.http
      .get(' http://localhost:3000/deptshow',this.form.value)
      .subscribe({
        next: (response) =>{ console.log(response); this.master=response},
        error: (error) => console.log(error),
      });
    return this.ServiceService.getUsersFromData();
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
      this.ServiceService.addUser(user);
    }
    this.userForm = false;
  }

  updateUser() {
    var formData: any = new FormData();
    console.log(this.sno);
    formData.set('sno', this.sno);
    console.log( formData.get('sno'));
    formData.append('plant_code', this.form1.get('plant_code')!.value);
    formData.append('sap_code', this.form1.get('sap_code')!.value);
    formData.append('active_status', this.form1.get('active_status')!.value);
    formData.append('modified_on', this.form1.get('modified_on')!.value);
    formData.append('sno', formData.get('sno'));
    var object:any;
    formData.forEach((value: any, key: string | number) => object[key] = value);
    var json = JSON.stringify(object);
    console.warn(json)
    this.http
      .post(' http://localhost:3000/deptedit',object)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
    return this.ServiceService.updateUser(this.editedUser);
  }

  removeUser(user: any){
    console.log(user);
    this.http
      .post(' http://localhost:3000/deptdel',{"user":user})
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
