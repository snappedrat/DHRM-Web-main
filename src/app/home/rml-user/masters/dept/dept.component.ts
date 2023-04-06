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

  plantname:any

  sample : any = environment.path
  temp_a:any
  array:any = []
  department: any = [

  ]
  editing_flag: any;
  index: any = -1

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      dept_slno:[''],
      plant_name :[''],
      names:[''],
      dept_name : [''],
      sap_code: [''],
      dept_group:['']

     
    })
   }

  ngOnInit(): void {

    this.getplantcode()

    this.service.getdepartment().
    subscribe({
      next: (response)=>{this.department = response}
    })
  }

  getplantcode(){
    var company = {'company_name': sessionStorage.getItem('companycode')}
    this.service.plantcodelist(company)
    .subscribe({
      next: (response) =>{ console.log(response); this.plantname = response;
        // for(var o in this.plantname)
        // this.array.push(this.plantname[o].plant_name)
       },
      error: (error) => console.log(error),
    });
  }

  open(content:any)
  {
    this.form.reset()
    this.editing_flag = false
    this.form.get('plant_name').enable()
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  get_slno(event:any)
  {
    console.log(this.form.value);
    
    console.log(event.target.value)
    this.index = event.target.value.split(':')[0]-1
  }

  save()
  {
    console.log(this.index)
    this.form.get('plant_name').setValue(this.plantname[this.index].plant_code)
    this.form.controls['dept_slno'].setValue(this.department.length+1)
    console.log(this.form.value)
    this.service.adddepartment(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);
      if(response.message == 'already')
      {
        alert('department already exists')
      }
    else
      {
        this.department.push(this.form.value)
        this.form.reset()
        this.index=-1
      }}
    })    

  }
/////////////////////////////////////////////////////edit functions
  opentoedit(content:any)
  {
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  edit(a:any, slno:any)
  {
    this.temp_a = a
    this.editing_flag = true
    this.form.controls['dept_slno'].setValue(slno)
    // var plant = {
    //   plant_code : this.department[a].plant_code,
    //   plant_name : this.department[a].plant_name,

    // }
    this.form.controls['plant_name'].setValue(this.department[a].plant_code)
    this.form.controls['dept_name'].setValue(this.department[a].dept_name)
    this.form.controls['dept_group'].setValue(this.department[a].dept_group)
    this.form.controls['sap_code'].setValue(this.department[a].sap_code)
    this.form.get('plant_name').disable()
    console.log(this.form.value)  
  }

  editSave()
  {
    this.form.get('plant_name').enable()
    
    // if(this.index == -1)
    // this.form.controls['plant_name'].setValue(this.department[this.temp_a].plant_code)
    // else
    // this.form.controls['plant_name'].setValue(this.plantname[this.index].plant_code)

    console.log(this.form.value)
    this.service.updatedepartment(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
      if(response.message== 'already')
      {
        alert('already exists')
      }
    else
      {
        // if(this.index == -1)
        // this.form.controls['plant_name'].setValue(this.department[this.temp_a].plant_name)
        // else
        // this.form.controls['plant_name'].setValue(this.plantname[this.index].plant_name)

        this.department[this.temp_a] = this.form.value

      }}
    })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any, slno:any)
{
  console.log(slno)
  this.service.deletedepartment({slno: slno})
  .subscribe({
    next: (response:any) =>{console.log(response); 
    if(response.message == 'success')
      this.department.splice(a,1)
  }
  })
}

exportexcel(): void
{
  var ws = XLSX.utils.json_to_sheet(this.department);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'department.xlsx');
}

reset()
{
  this.form.reset()
}

}
