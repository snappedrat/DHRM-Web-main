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
  styleUrls: ['./designation.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DesignationComponent implements OnInit {
  closeResult: string;

  form:any

  plantname:any

  temp_a:any
  sample : any = environment.path
  array:any = []
  index:any = -1

  designation: any = [

  ]
  editing_flag: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      slno:[''],
      desig_name :[''],
      plant_name : [''],
      names:['']
     
    })
   }

  

  exportexcel(): void
  {
  var ws = XLSX.utils.json_to_sheet(this.designation);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'designation.xlsx');
}

ngOnInit(): void {
  this.getplantcode()
  this.service.getdesignation().
  subscribe({
    next: (response)=>{console.log(response);this.designation = response}
  })
}

getplantcode(){
  var company = {'company_name': sessionStorage.getItem('companycode')}
  this.service.plantcodelist(company)
  .subscribe({
    next: (response) =>{ console.log(response); this.plantname = response;
      for(var o in this.plantname)
      this.array.push(this.plantname[o].plant_name) },
    error: (error) => console.log(error),
  });
}

get_slno(event:any)
{
  this.index = event.target.value.split(':')[0]-1
}

   open(content:any)
  {
    this.form.reset();
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
    this.temp_a = a
    this.editing_flag = true
    this.form.controls['slno'].setValue(this.designation[a].slno)
    this.form.controls['desig_name'].setValue(this.designation[a].desig_name)

      this.form.controls['names'].setValue(this.designation[a]?.plant_name)
      this.form.controls['plant_name'].setValue(this.designation[a]?.plant_name)

      for(var o in this.plantname)
        this.array.push(this.plantname[o].plant_name)

  }
  save()
  {

    this.form.get('plant_name').setValue(this.plantname[this.index].plant_code)

    console.log(this.form.value)
    this.service.adddesignation(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);

        this.designation.push(this.form.value)
        this.form.reset()
        this.index = -1
      }
    })    

  }
  editSave()
  {
    if(this.index == -1)
    this.form.controls['plant_name'].setValue(this.designation[this.temp_a].plant_code)
    else
    this.form.controls['plant_name'].setValue(this.plantname[this.index].plant_code)

    this.service.updatedesignation(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
      if(response.message == 'updated')
      {
        if(this.index == -1)
        this.form.controls['plant_name'].setValue(this.designation[this.temp_a].plant_name)
        else
        this.form.controls['plant_name'].setValue(this.plantname[this.index].plant_name)
        this.designation[this.temp_a] = this.form.value
      }
      }
    })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any, slno:any)
{
  this.service.deletedesignation({slno : slno})
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
