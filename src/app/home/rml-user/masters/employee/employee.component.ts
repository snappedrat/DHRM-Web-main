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
import { PlantcodeService } from "../../new-joiners/plantcode.service";





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
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class EmployeeComponent implements OnInit {
  closeResult: string;

 form:any
 plantcode:any;

 all_details:any
 desig:any
 dept:any
 line:any

  sample : any = environment.path

  employee: any = [
    {
      'employee_name':'AIDUA',
      'plant_code':'',
      'department' : '',
      'designation' : '',
      'line':[''],
      'mail_id':'abc123@gmail.com',
      'mobile_no':'99876543210',
      'user_name':'aameerk',
      'active_status': 1,
    }
  ]
  editing_flag: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal,private plantcodeService: PlantcodeService, private service : ApiService) {
    this.form = this.fb.group({
      gen_id: [''],
      employee_name :[''],
      plant_code:[''],
      department : [''],
      designation : [''],
      line:[''],
      mail_id: [''],
      mobile_no: [''],
      user_name: [''],
      password: [ ''],     
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
  this.getplantcode()
  var username = {'username': sessionStorage.getItem('plantcode')}
  this.service.getModules(username).
  subscribe({
    next: (response)=>{this.employee = response}
  })
}

getplantcode(){
  var company = {'company_name': sessionStorage.getItem('companycode')}
  this.service.plantcodelist(company)
  .subscribe({
    next: (response) =>{ console.log(response); this.plantcode = response },
    error: (error) => console.log(error),
  });
}

getall(event:any)
{
  var plantcode = {plantcode: event.target.value}
    this.service.line_dept_design(plantcode)
    .subscribe({
      next: (response) =>{ console.log(response); this.all_details = response;
        this.desig= this.all_details[0]
        this.dept= this.all_details[1]
        this.line= this.all_details[2]

      },
      error: (error) => console.log(error),
    });
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
    this.form.controls['employee_name'].setValue(this.employee[a].plant_code)
    this.form.controls['department'].setValue(this.employee[a].dept_name)
    this.form.controls['designation'].setValue(this.employee[a].designation)
    this.form.controls['mail_id'].setValue(this.employee[a].mail_id)
    this.form.controls['mobile_no'].setValue(this.employee[a].mobile_no)
    this.form.controls['user_name'].setValue(this.employee[a].user_name)
    this.form.controls['password'].setValue(this.employee[a].password)
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
        this.employee.push(this.form.value)
        this.form.reset()
        console.log(this.form.value)
      }}
    })    

  }
  sendData(){
    this.plantcodeService.fam = this.employee
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
        this.employee[this.form.controls['sno'].value] = this.form.value
      }}
    })
    this.form.reset();
  }
/////////////////////////////////////////////////////edit functions

delete(a:any)
{
  this.service.deletemodule(this.employee[a])
  .subscribe({
    next: (response:any) =>{console.log(response); 
    if(response.message == 'success')
      this.employee.splice(a,1)
  }
  })
}




  reset()
{
  this.form.reset()
}

}
