import { Component, OnInit,ViewChild,Injectable, ViewContainerRef, TemplateRef,ViewEncapsulation  } from '@angular/core';
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
// import { MatSidenav } from "@angular/material/sidenav";
// import { MatTableModule } from "@angular/material/table";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { environment } from "src/environments/environment.prod";

const material = [
  MatSidenav,
  MatTableModule
];



@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DeptComponent implements OnInit {
  closeResult: string;

  form:any

  sample : any = environment.path

  dummy: any = [
    {
      'plant_code':1220,
      'department_name' : 'ABCD',
      'sap_code': 800,
      'active_status': 1,
      'created_on' :'12/2/2022',
      'created_by': '12/1/2022',
      'modified_on': '12/1/2022',
      'modified_by': '12/1/2022', 
    }
  ]
  editing_flag: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      plant_code :[''],
      department_name : [''],
      sap_code: [''],
      active_status: [''],
      created_on: [''],
      created_by: [''],
      modified_on: [''],
      modified_by: [''],
      plantcode: [sessionStorage.getItem('plantcode')]
     
    })
   }

  ngOnInit(): void {
    var username = {'username': sessionStorage.getItem('plantcode')}
    this.service.getModules(username).
    subscribe({
      next: (response)=>{this.dummy = response}
    })
  }

  open(content:any)
  {
    this.editing_flag = false
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  save()
  {
    this.service.addmodule(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);
      if(response.message == 'already')
      {
        alert('Module with same priority value already exists')
      }
    else
      {
        this.dummy.push(this.form.value)
        this.form.reset()
        console.log(this.form.value)
      }}
    })    

  }
/////////////////////////////////////////////////////edit functions
  opentoedit(content:any)
  {
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  edit(a:any)
  {
    this.editing_flag = true
    this.form.controls['plant_code'].setValue(this.dummy[a].plant_code)
    this.form.controls['department_name'].setValue(this.dummy[a].dept_name)
    this.form.controls['sap_code'].setValue(this.dummy[a].sap_code)
    this.form.controls['active_status'].setValue(this.dummy[a].del_staus)
    



  }

  editSave()
  {
    this.service.updatemodule(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
      if(response.message== 'already')
      {
        alert('Module with same priority value already exists')
      }
    else
      {
        this.dummy[this.form.controls['sno'].value] = this.form.value
      }}
    })
    this.form.reset();
  }
/////////////////////////////////////////////////////edit functions

delete(a:any)
{
  this.service.deletemodule(this.dummy[a])
  .subscribe({
    next: (response:any) =>{console.log(response); 
    if(response.message == 'success')
      this.dummy.splice(a,1)
  }
  })
}

exportexcel(): void
{
  let element = document.getElementById('table');
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'department.xlsx');
}

reset()
{
  this.form.reset()
}

}
