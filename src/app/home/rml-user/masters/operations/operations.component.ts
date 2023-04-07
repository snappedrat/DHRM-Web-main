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
import { LoaderserviceService } from 'src/app/loaderservice.service';

const material = [
  MatSidenav,
  MatTableModule
];



@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OperationsComponent implements OnInit {
  closeResult: string;

  form:any

  sample : any = environment.path

  plantname:any
  type = ['YES', 'NO']

  dummy: any = [

  ]
  editing_flag: any;
  temp_a: any;
  array: any = [];
  index: number = -1;
  is_admin:any = sessionStorage.getItem('isadmin')

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService,public loader:LoaderserviceService) {
    this.form = this.fb.group({
      oprn_slno: [''],
      plant_name :[''],
      oprn_desc : [''],
      critical_oprn: [''],
      skill_level: [''],
          
    })
   }

  ngOnInit(): void {

    this.getplantcode()
    this.service.getoperation().
    subscribe({
      next: (response)=>{this.dummy = response}
    })
  }

  getplantcode(){
    var company = {'company_name': sessionStorage.getItem('companycode')}
    this.service.plantcodelist(company)
    .subscribe({
      next: (response) =>{ console.log(response); this.plantname = response ;
        for(var o in this.plantname)
        this.array.push(this.plantname[o].plant_name)
      },
      error: (error) => console.log(error),
    });
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
    if(this.is_admin == 'true')
      this.form.get('plant_name').setValue(this.plantname[this.index].plant_code)
    else
      this.form.get('plant_name').setValue(sessionStorage.getItem('plantcode'))

    this.service.addoperation(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);

        this.dummy.push(this.form.value)
        this.form.reset()
        this.index = -1
      }
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
    this.form.get('plant_name').disable()
    this.editing_flag = true
    this.temp_a = a

    this.form.controls['plant_name'].setValue(this.dummy[a].plant_name)
    this.form.controls['oprn_slno'].setValue(slno)
    this.form.controls['oprn_desc'].setValue(this.dummy[a].oprn_desc)
    this.form.controls['skill_level'].setValue(this.dummy[a].skill_level)

    if(this.dummy[a].critical_oprn == true)
      this.form.controls['critical_oprn'].setValue('YES')
    else if(this.dummy[a].critical_oprn == false)
      this.form.controls['critical_oprn'].setValue('NO')
    console.log(this.form.value)

  }

  get_slno(event:any)
{
  this.index = event.target.value.split(':')[0]-1
}

  editSave()
  {
    this.form.get('plant_name').enable()

    console.log(this.index)
    // if(this.index == -1)
    // this.form.controls['plant_name'].setValue(this.dummy[this.temp_a].plant_code)
    // else
    // this.form.controls['plant_name'].setValue(this.plantname[this.index].plant_code)

    console.log(this.form.value)

    this.service.updateoperation(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
      if(response.message == 'updated')
      {
        // if(this.index == -1)
        // this.form.controls['plant_name'].setValue(this.dummy[this.temp_a].plant_name)
        // else
        // this.form.controls['plant_name'].setValue(this.plantname[this.index].plant_name)  
        console.log(this.form.value)        
        this.dummy[this.temp_a] = this.form.value
      }
      }
    })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any, slno:any)
{
  this.service.deleteoperation({slno : slno})
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
  XLSX.writeFile(wb, 'department.xlsx');
}

reset()
{
  this.form.reset()
}

}
