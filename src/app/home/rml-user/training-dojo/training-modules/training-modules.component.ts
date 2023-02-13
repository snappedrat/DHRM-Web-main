import {Component, OnInit, ViewChild, Injectable, ViewContainerRef, TemplateRef, NgModule, Inject,ViewEncapsulation} from "@angular/core";
import {UntypedFormBuilder,} from "@angular/forms";

import * as XLSX from "xlsx";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { environment } from "src/environments/environment.prod";

@Component({  selector: 'app-training-modules',
  templateUrl: './training-modules.component.html',
  styleUrls: ['./training-modules.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class TrainingModulesComponent implements OnInit {
  closeResult: string;

  form:any

  sample : any = environment.path

  dummy: any = [
    {
    }
  ]
  editing_flag: any;
  temp_a: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      slno :[''],
      module_name : [''],
      pass_criteria: [''],
      total_marks: [''],
      pass_percent : [''],
      category: [''],
      priorityval: [''],
      plantcode: ['']
    })
   }

  ngOnInit(): void {
    var username = {'username': sessionStorage.getItem('plantcode')}
    this.service.getModules(username).
    subscribe({
      next: (response)=>{this.dummy = response}
    })
  }

  cal()
  {
    var a = this.form.controls['pass_criteria'].value
    var b = this.form.controls['total_marks'].value
    var c = Math.round((a/b)*100)
    this.form.controls['pass_percent'].setValue(c)
  }

  open(content:any)
  {
    this.form.reset()
    this.editing_flag = false
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  save()
  {
    this.form.controls['plantcode'].setValue(sessionStorage.getItem('plantcode'))
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
      }}
    })    

  }
/////////////////////////////////////////////////////edit functions
  opentoedit(content:any)
  {
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  edit(a:any ,slno:any)
  {
    this.temp_a = a
    this.editing_flag = true
    this.form.controls['slno'].setValue(slno)
    this.form.controls['module_name'].setValue(this.dummy[a].module_name)
    this.form.controls['pass_criteria'].setValue(this.dummy[a].pass_criteria)
    this.form.controls['total_marks'].setValue(this.dummy[a].total_marks)
    this.form.controls['pass_percent'].setValue(this.dummy[a].pass_percent)
    this.form.controls['category'].setValue(this.dummy[a].category)
    this.form.controls['priorityval'].setValue(this.dummy[a].priorityval)

  }

  editSave()
  {
    this.form.controls['plantcode'].setValue(sessionStorage.getItem('plantcode'))
    this.service.updatemodule(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
      if(response.message== 'already')
      {
        alert('Module with same priority value already exists')
      }
    else
      {
        this.dummy[this.temp_a] = this.form.value
      }}
    })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any, slno:any)
{
  this.service.deletemodule({slno: slno})
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

reset()
{
  this.form.reset()
}

}
