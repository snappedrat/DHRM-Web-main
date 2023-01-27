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
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { environment } from "src/environments/environment.prod";

const material = [
  MatSidenav,
  MatTableModule
];

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BankComponent implements OnInit {
  closeResult: string;

  form:any

  sample : any = environment.path

  dummy: any = [

  ]
  editing_flag: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      Slno:[''],
      bank_name :[''],
      bank_code: [''],
     
    })
   }

  ngOnInit(): void {
    this.service.getbank().
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
    this.form.controls['Slno'].setValue(this.dummy.length+1)
    this.service.addbank(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);
      if(response.message == 'already')
      {
        alert('bank already exists')
      }
    else
      {
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
    this.form.controls['Slno'].setValue(a)
    this.form.controls['bank_name'].setValue(this.dummy[a].bank_name)
    this.form.controls['bank_code'].setValue(this.dummy[a].bank_code)
  }

  editSave()
  {
    this.service.updatebank(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
        this.dummy[this.form.controls['Slno'].value] = this.form.value
      }
    })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any)
{
  this.service.deletebank(this.dummy[a])
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
  XLSX.writeFile(wb, 'bank_details.xlsx');
}

reset()
{
  this.form.reset()
}

}
