import {
  Component,
  OnInit,
  ViewChild,
  Injectable,
  ViewContainerRef,
  TemplateRef,
  NgModule,
  Inject,
  ViewEncapsulation,
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
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
  encapsulation:ViewEncapsulation.None,
})

export class LineComponent implements OnInit {
  closeResult: string;

  form:any

  sample : any = environment.path

  line: any = [
    {
      'plant_name':'AIDUA',
      'department':'ada',
      'line_name':'fsm;',
      'personal_subarea':'SFSF',

    
      
    }
  ]
  editing_flag: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      plant_name: [''],
      department: [''],
      line_name:[''],
      personal_subarea:[''],
      plantcode: [sessionStorage.getItem('plantcode')]
     
    })
   }

  

  exportexcel(): void
{
  let element = document.getElementById('table');
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'line.xlsx');
}

ngOnInit(): void {
  var username = {'username': sessionStorage.getItem('plantcode')}
  this.service.getModules(username).
  subscribe({
    next: (response)=>{this.line = response}
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
    this.form.controls['plant_name'].setValue(this.line[a].plant_name)
    this.form.controls['department'].setValue(this.line[a].department)
    this.form.controls['line_name'].setValue(this.line[a].line_name)
    this.form.controls['personal_subarea'].setValue(this.line[a].personal_subarea)


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
        this.line.push(this.form.value)
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
        this.line[this.form.controls['sno'].value] = this.form.value
      }}
    })
    this.form.reset();
  }
/////////////////////////////////////////////////////edit functions

delete(a:any)
{
  this.service.deletemodule(this.line[a])
  .subscribe({
    next: (response:any) =>{console.log(response); 
    if(response.message == 'success')
      this.line.splice(a,1)
  }
  })
}




  reset()
{
  this.form.reset()
}
}
