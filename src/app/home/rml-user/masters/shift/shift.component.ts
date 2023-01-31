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
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ShiftComponent implements OnInit {
  closeResult: string;

  form:any

  sample : any = environment.path

  shift: any = []
  editing_flag: any;
  temp_a: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      shift_id:[''],
     shift_desc :[''],
     plant_desc : [''],
     plant_code:[''],
      act_tm_from: [''],
      in_tm_max: [''],
      in_tm_min: [''],
      act_tm_to: [''],
      type:[''],
      shift_group:[''],   
      security_shift:['']  
    })
   }

  ngOnInit(): void {
    this.service.getshift().
    subscribe({
      next: (response)=>{this.shift = response}
    })
  }

  open(content:any)
  {

    this.form.reset()

    this.form.controls['plant_code'].setValue(sessionStorage.getItem('plantcode'))
    this.form.controls['plant_desc'].setValue(sessionStorage.getItem('plant_name'))

    this.editing_flag = false
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  save()
  {
    this.service.addshift(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);

        this.shift.push(this.form.value)
        this.form.reset()
      }
    })    
    console.log(this.form.value)

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

    this.form.controls['plant_code'].setValue(sessionStorage.getItem('plantcode'))
    this.form.controls['plant_desc'].setValue(sessionStorage.getItem('plant_name'))
    
    this.form.controls['shift_id'].setValue(slno)
    this.form.controls['shift_desc'].setValue(this.shift[a].shift_desc)
    this.form.controls['act_tm_from'].setValue(this.shift[a].act_tm_from?.slice(this.shift[a].act_tm_from.indexOf('T')+1, this.shift[a].act_tm_from.indexOf('.')))
    this.form.controls['act_tm_to'].setValue(this.shift[a].act_tm_to?.slice(this.shift[a].act_tm_to.indexOf('T')+1, this.shift[a].act_tm_to.indexOf('.')))
    this.form.controls['in_tm_max'].setValue(this.shift[a].in_tm_max?.slice(this.shift[a].in_tm_max.indexOf('T')+1, this.shift[a].in_tm_max.indexOf('.')))
    this.form.controls['in_tm_min'].setValue(this.shift[a].in_tm_min?.slice(this.shift[a].in_tm_min.indexOf('T')+1, this.shift[a].in_tm_min.indexOf('.')))
    this.form.controls['shift_group'].setValue(this.shift[a].shift_group)
    this.form.controls['type'].setValue(this.shift[a].type)
    this.form.controls['security_shift'].setValue(this.shift[a].security_shift)

    console.log(this.form.value)
  }

  editSave()
  {
    this.service.updateshift(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
      if(response.message== 'updated')
        this.shift[this.temp_a] = this.form.value
      }
    })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any, slno:any)
{
  this.service.deleteshift({slno: slno})
  .subscribe({
    next: (response:any) =>{console.log(response); 
    if(response.message == 'success')
      this.shift.splice(a,1)
  }
  })
}

exportexcel(): void
{
  var ws = XLSX.utils.json_to_sheet(this.shift);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'department.xlsx');
}

reset()
{
  this.form.reset()
}

}
