import {
  Component,
  OnInit,
  ViewChild,
  Injectable,
  ViewContainerRef,
  TemplateRef,
  NgModule,
  Inject,
  ViewEncapsulation
} from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import * as XLSX from "xlsx";
import { MatSidenav } from "@angular/material/sidenav";
import { ServiceService } from "../service.service";
import { User } from "../user/user";
import { MatTableModule } from "@angular/material/table";
import { Observable, Subject } from "rxjs";
import { Options } from "selenium-webdriver";





import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Directive, Input } from "@angular/core";import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { environment } from "src/environments/environment.prod";

const material = [
  MatSidenav,
  MatTableModule
];


 

@Component({
  selector: 'app-dept',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})

export class DesignationComponent implements OnInit {
  closeResult: string;

  form:any
  encapsulation:ViewEncapsulation.None
  sample : any = environment.path

  designation: any = [
    {
      'designation_name':'AIDUA',
      'plant_code' : 'ABCD',
    }
  ]
  editing_flag: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      department_name :[''],
      plant_name : [''],
      active_status: [''],
      modified_by: [''],
      plantcode: [sessionStorage.getItem('plantcode')]
     
    })
   }

  

  exportexcel(): void
{
  let element = document.getElementById('table');
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'designation.xlsx');
}

ngOnInit(): void {
  var username = {'username': sessionStorage.getItem('plantcode')}
  this.service.getModules(username).
  subscribe({
    next: (response)=>{this.designation = response}
  })
}


   open(content:any)
  {
    this.editing_flag = false
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }
  opentoedit(content:any)
  {
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

   
edit(a:any)
  {
    this.editing_flag = true
    this.form.controls['designation_name'].setValue(this.designation[a].plant_code)
    this.form.controls['plant_name'].setValue(this.designation[a].dept_name)

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
        this.designation.push(this.form.value)
        this.form.reset()
        console.log(this.form.value)
      }}
    })    

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
        this.designation[this.form.controls['sno'].value] = this.form.value
      }}
    })
    this.form.reset();
  }
/////////////////////////////////////////////////////edit functions

delete(a:any)
{
  this.service.deletemodule(this.designation[a])
  .subscribe({
    next: (response:any) =>{console.log(response); 
    if(response.message == 'success')
      this.designation.splice(a,1)
  }
  })
}




  reset()
{
  this.form.reset()
}
}
