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
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PincodeComponent implements OnInit {
  closeResult: string;

  form:any

  sample : any = environment.path

  dummy: any = [
    {
      'pincode':600019,
      'division_name' : 'ABCD',
      'region_name': 300,
      'circle_name': 500,
      'taluk': 1,
      'district_name': 1,
      'state_name': 1,
      'rbl_zone': 1,
      'rml_zone': 1,
      'rap_zone': 1,
      'revl_zone': 1,
      'rtssl_zone': 1,
      'state_code': 1,
    }
  ]
  editing_flag: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      pincode:[''],
      division_name :[''],
      region_name: [''],
      circle_name: [''],
      taluk: [''],
      district_name: [''],
      state_name: [''],
      rbl_zone: [''],
      rml_zone: [''],
      rap_zone: [''],
      revl_zone: [''],
      rtssl_zone: [''],
      state_code: [''],
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
    this.form.controls['pincode'].setValue(this.dummy[a].pincode)
    this.form.controls['division_name'].setValue(this.dummy[a].division_name)
    this.form.controls['region_name'].setValue(this.dummy[a].region_name)
    this.form.controls['circle_name'].setValue(this.dummy[a].circle_name)
    this.form.controls['taluk'].setValue(this.dummy[a].taluk)
    this.form.controls['district_name'].setValue(this.dummy[a].district_name)
    this.form.controls['state_name'].setValue(this.dummy[a].state_name)
    this.form.controls['rbl_zone'].setValue(this.dummy[a].rbl_zone)
    this.form.controls['rml_zone'].setValue(this.dummy[a].rml_zone)
    this.form.controls['rap_zone'].setValue(this.dummy[a].rap_zone)
    this.form.controls['revl_zone'].setValue(this.dummy[a].revl_zone)
    this.form.controls['rtssl_zone'].setValue(this.dummy[a].rtssl_zone)
    this.form.controls['state_code'].setValue(this.dummy[a].state_code)









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
