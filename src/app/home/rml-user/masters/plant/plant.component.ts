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
import { threadId } from 'worker_threads';

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
  file:any
  new:any

  sample : any = environment.path

  dummy: any = []
  editing_flag: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      sno:[''],
      plant_code :[''],
      plant_name : [''],
      pl : [''], 
      addr : [''],
      locatn : [''],
      plant_sign : [''],
      personal_area : [''],
      payroll_area:[''],
      company_code:['']
     
    })
   }

  ngOnInit(): void {
    this.service.getplant().
    subscribe({
      next: (response)=>{this.dummy = response}
    })
  }

  open(content:any)
  {
    this.form.reset();
    this.editing_flag = false
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  save()
  {
    
    this.form.controls['plant_sign'].setValue(this.form.controls['plant_code'].value+'_'+'_sign.'+this.new)
    console.log(this.form.controls['plant_sign'].value)

    this.service.addplant(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);
      if(response.message == 'already')
      {
        alert('plant with code value already exists')
      }
    else
      {
        console.log(this.form.value)
        this.dummy.push(this.form.value)
        this.form.reset()
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

    this.form.controls['sno'].setValue(a)

    this.form.controls['company_code'].setValue(this.dummy[a].company_code)
    this.form.controls['plant_code'].setValue(this.dummy[a].plant_code)
    this.form.controls['plant_name'].setValue(this.dummy[a].plant_name)
    this.form.controls['pl'].setValue(this.dummy[a].pl)
    this.form.controls['addr'].setValue(this.dummy[a].addr)
    this.form.controls['locatn'].setValue(this.dummy[a].locatn)
    this.form.controls['personal_area'].setValue(this.dummy[a].personal_area)
    this.form.controls['payroll_area'].setValue(this.dummy[a].payroll_area)

  }

  editSave()
  {
    this.service.updateplant(this.form.value)
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
  }
/////////////////////////////////////////////////////edit functions

delete(a:any)
{
  this.service.deleteplant(this.dummy[a])
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

upload(event:any)
{
  this.file = event.target.files[0]

	var file_local = this.file?.name.split('.')
	this.new = file_local?.pop()
}

}


