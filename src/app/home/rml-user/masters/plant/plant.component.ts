import { Component, OnInit,ViewChild,Injectable, ViewContainerRef, TemplateRef, NgModule,ViewEncapsulation} from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder, Validators} from '@angular/forms';
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
import { LoaderserviceService } from 'src/app/loaderservice.service';

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
  company:any
  companylist:any

  sample : any = environment.path

  dummy: any = []
  editing_flag: any;
  inx: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService,public loader: LoaderserviceService) {
    this.form = this.fb.group({
      sno:[''],
      plant_code :['', Validators.required],
      plant_name : ['', Validators.required],
      pl : ['', Validators.required], 
      addr : ['', Validators.required],
      locatn : ['', Validators.required],
      plant_sign : [''],
      personal_area : ['', Validators.required],
      payroll_area:['', Validators.required],
      company_code:['', Validators.required]
     
    })
   }

  ngOnInit(): void {
    this.service.getplant().
    subscribe({
      next: (response)=>{this.dummy = response}
    })
    this.service.companycodelist()
    .    subscribe({
      next: (response)=>{
        console.log(response)
        this.companylist = response;
        this.company = this.companylist.map((a:any) => a.company_name)
      }
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
    this.form.controls['company_code'].setValue(this.companylist[this.inx].company_code)
    this.form.controls['plant_sign'].setValue(this.form.controls['plant_code'].value+'_sign.'+this.new)
    console.log(this.form.value)

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
  getValue(event:any)
  {
    var inx = event.target.value.split(':')[0]
    this.inx = inx - 1
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
    this.form.get('company_code').disable()
    this.form.controls['sno'].setValue(a)

    let index = this.companylist.findIndex((x:any)=> x.company_code === this.dummy[a].company_code);
    
    this.form.controls['company_code'].setValue(this.companylist[index]?.company_name)    
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
    this.form.controls['plant_sign'].setValue(this.form.controls['plant_code'].value+'_sign.'+this.new)
    console.log(this.form.value)
    this.service.updateplant(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
      if(response.message== 'already')
      {
        alert('plant with code already exists')
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
  var ws = XLSX.utils.json_to_sheet(this.dummy);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'plant_master.xlsx');
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

  var formData = new FormData()

  formData.append("file", event.target.files[0], this.form.controls['plant_code'].value+'_sign.'+this.new )
  
  this.service.plantupload(formData)
  .subscribe(
    {
      next: (res)=>{console.log(res)},
      error: (err=>{console.log(err)})
    }
  )

}

}


