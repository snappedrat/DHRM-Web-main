import {Component, OnInit, ViewChild, Injectable, ViewContainerRef, TemplateRef, NgModule, Inject,ViewEncapsulation} from "@angular/core";
import {UntypedFormBuilder,} from "@angular/forms";

// import { HttpClient } from "@angular/common/http";
// import { Router } from "@angular/router";
import * as XLSX from "xlsx";
// import { MatSidenav } from "@angular/material/sidenav";
// import { MatTableModule } from "@angular/material/table";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";

// import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({  selector: 'app-training-modules',
  templateUrl: './training-modules.component.html',
  styleUrls: ['./training-modules.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class TrainingModulesComponent implements OnInit {
  closeResult: string;

  form:any

  dummy: any = [
    {
      'sno':1,
      'name' : 'safety',
      'pass': 80,
      'total': 100,
      'percent' : 80,
      'category': 'ONLINE',
      'priority': 4,
      'plantcode': 1150, 
    }
  ]
  editing_flag: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      sno :[''],
      module_name : [''],
      pass_criteria: [''],
      total_marks: [''],
      pass_percent : [''],
      category: [''],
      priorityval: [''],
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
    this.form.controls['sno'].setValue(a)
    this.form.controls['module_name'].setValue(this.dummy[a].module_name)
    this.form.controls['pass_criteria'].setValue(this.dummy[a].pass_criteria)
    this.form.controls['total_marks'].setValue(this.dummy[a].total_marks)
    this.form.controls['pass_percent'].setValue(this.dummy[a].pass_percent)
    this.form.controls['category'].setValue(this.dummy[a].category)
    this.form.controls['priorityval'].setValue(this.dummy[a].priorityval)

  }

  editSave()
  {
    this.dummy[this.form.controls['sno'].value] = this.form.value
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
  XLSX.writeFile(wb, 'trg_modules.xlsx');
}

}
