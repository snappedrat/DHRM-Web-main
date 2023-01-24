import { Component, OnInit,ViewChild,Injectable, ViewContainerRef, TemplateRef, NgModule,ViewEncapsulation} from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { environment } from "src/environments/environment.prod";
import { CookieService } from 'ngx-cookie-service';

const material = [MatSidenav, MatTableModule];

@Component({
  selector: "app-plant",
  templateUrl: "./plant.component.html",
  styleUrls: ["./plant.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class PlantComponent implements OnInit {
  closeResult: string;

  form:any

  sample : any = environment.path

  dummy: any = [
    {
      'SNo':1220,
      'company_code': '12000',
      'company_name': 'adda',
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
      sno:[''],
      company_code :[''],
      company_name : [''],
      sap_code: [''],
      active_status: [''],
      created_on: [''],
      created_by: [''],
      modified_on: [''],
      modified_by: [''],
      companycode: [sessionStorage.getItem('companycode')]
     
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
    this.form.controls['company_code'].setValue(this.dummy[a].plant_code)
    this.form.controls['company_name'].setValue(this.dummy[a].dept_name)
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
  XLSX.writeFile(wb, 'master_company.xlsx');
}

reset()
{
  this.form.reset()
}

}


