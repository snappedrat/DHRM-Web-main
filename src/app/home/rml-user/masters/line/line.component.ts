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
  array :any = []
  array2 :any = []

  line: any = []
  editing_flag: any;
  plantname: any;
  dept:any
  all_details:any
  temp_a: any;
  index: any = -1;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      plant_name: [''],
      dept_name: [''],
      Line_Name:[''],
      Line_code: [''],
      personal_subarea:[''],
      modified_by: [''],
      created_by: [''],     
    })
   }

  

  exportexcel(): void
{
  var ws = XLSX.utils.json_to_sheet(this.line);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'line.xlsx');
}

ngOnInit(): void {
  this.getplantcode()
  var plantcode:any = {plantcode: sessionStorage.getItem('plantcode')}
  this.service.getline(plantcode).
  subscribe({
    next: (response)=>{console.log(response);this.line = response;
      for(var o in this.plantname)
      this.array.push(this.plantname[o].plant_name) }
  })
}

getplantcode(){
  var company = {'company_name': sessionStorage.getItem('companycode')}
  this.service.plantcodelist(company)
  .subscribe({
    next: (response) =>{ console.log(response); this.plantname = response },
    error: (error) => console.log(error),
  });
}

getall(event:any)
{
  console.log(event.target.value)
  this.index = event.target.value.split(':')[0]-1
  var plantcode = {plantcode: this.plantname[this.index].plant_code}
    this.service.line_dept_design(plantcode)
    .subscribe({
      next: (response) =>{ console.log(response); this.all_details = response;
        this.dept= this.all_details[1]
        this.array2 = this.dept.map((a:any)=>a.dept_name)
      },
      error: (error) => console.log(error),
    });
}

open(content:any)
  {
    this.editing_flag = false
    this.form.reset();
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }
opentoedit(content:any)
  {

   console.log("opening")
    this.modalService.open(content, {centered: true})
  }

   
edit(a:any, slno:any)
  {
    this.editing_flag = true
    this.temp_a = a
    this.form.controls['Line_code'].setValue(slno)
    this.form.controls['plant_name'].setValue(this.line[a].plant_name)
    this.form.controls['Line_Name'].setValue(this.line[a].Line_Name)
    this.form.controls['personal_subarea'].setValue(this.line[a].personal_subarea)
    this.form.controls['modified_by'].setValue(sessionStorage.getItem('user_name'))

    
    var plantcode = {plantcode: this.line[a].plant_code}
    this.service.line_dept_design(plantcode)
    .subscribe({
      next: (response) =>{ console.log(response); this.all_details = response;
        this.dept= this.all_details[1]
        this.array2 = this.dept.map((a:any)=>a.dept_name)
      },
      error: (error) => console.log(error),
    });
    this.form.controls['dept_name'].setValue(this.line[a].dept_name)

  }
save()
  {
    this.form.get('plant_name').setValue(this.plantname[this.index].plant_code)
    this.form.controls['created_by'].setValue(sessionStorage.getItem('user_name'))
    this.form.controls['Line_code'].setValue(this.line.length+1)
    console.log(this.form.value)
    this.service.addline(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);

        this.line.push(this.form.value)
        this.form.reset()
        this.index = -1
      }
    })    

  }
editSave()
  {
      if(this.index == -1)
      this.form.get('plant_name').setValue(this.line[this.temp_a].plant_code)
      else
      this.form.controls['plant_name'].setValue(this.plantname[this.index].plant_code)
  
    console.log(this.form.value);
    
    this.service.updateline(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
        if(this.index == -1)
        this.form.controls['plant_name'].setValue(this.line[this.temp_a].plant_name)
        else
        this.form.controls['plant_name'].setValue(this.plantname[this.index].plant_name)
      this.line[this.temp_a] = this.form.value
        }
    })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any, slno:any)
{
  console.log("vrrrrrrrrrrrrrrrrrrr", slno)
  this.service.deleteline({slno : slno})
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
