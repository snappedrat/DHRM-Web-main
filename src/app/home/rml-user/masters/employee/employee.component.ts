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
 plantname:any
 array:any = []

 all_details:any
 desig:any
 dept:any
 line:any

 desig_:any= []
 dept_:any= []
 line_:any= []


  sample : any = environment.path

  employee: any = [

  ]
  editing_flag: any;
  temp_a: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal,private plantcodeService: PlantcodeService, private service : ApiService) {
    this.form = this.fb.group({
      gen_id: ['', Validators.required],
      Emp_Name :['', Validators.required],
      plant_name:['', Validators.required],
      dept_name : ['', Validators.required],
      desig_name : ['', Validators.required],
      Line_Name:['', Validators.required],
      Mail_Id: ['', Validators.required],
      Mobile_No: ['', Validators.required],
      User_Name: ['', Validators.required],
      Password: [ '', Validators.required],     
      Is_HR:[''],
      Is_HRAppr:[''],
      Is_Trainer:[''],
      Is_Supervisor:[''],
      Is_ReportingAuth:[''],
      Is_TOU:[''],

    })
   }

  

  exportexcel(): void
{
  var ws = XLSX.utils.json_to_sheet(this.employee);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "People");
  XLSX.writeFile(wb,"employee.xlsx");
}


ngOnInit(): void {
  this.getplantcode()
  this.service.getemployee().
  subscribe({
    next: (response)=>{this.employee = response}
  })
}

getplantcode(){
  var company = {'company_name': sessionStorage.getItem('companycode')}
  this.service.plantcodelist(company)
  .subscribe({
    next: (response) =>
    { console.log(response); this.plantname = response;

      for(var o in this.plantname)
      this.array.push(this.plantname[o].plant_name) 
    },
    error: (error) => console.log(error),
  });
}

getall(event:any)
{
  console.log(event.target.value)

  this.form.get('dept_name').setValue('')
  this.form.get('Line_Name').setValue('')
  this.form.get('desig_name').setValue('')

  var plantcode = {plantcode: this.plantname[event.target.value.split(':')[0]-1].plant_code}
    this.service.line_dept_design(plantcode)
    .subscribe({
      next: (response) =>{ console.log(response); this.all_details = response;
        this.desig= this.all_details[0]
        this.dept= this.all_details[1]
        this.line= this.all_details[2]

        this.desig = this.desig.map((a:any)=>a.desig_name)
        this.dept= this.dept.map((a:any)=>a.dept_name)
        this.line = this.line.map((a:any)=>a.line_name)
      },
      error: (error) => console.log(error),
    });
}

   open(content:any)
  {
    this.form.reset()

    this.form.controls['Is_HR'].setValue(false)
    this.form.controls['Is_HRAppr'].setValue(false)
    this.form.controls['Is_Trainer'].setValue(false)
    this.form.controls['Is_Supervisor'].setValue(false)
    this.form.controls['Is_ReportingAuth'].setValue(false)
    this.form.controls['Is_TOU'].setValue(false)

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

    this.desig_.splice(0, this.desig_.length);
    this.dept_.splice(0, this.dept_.length);
    this.line_.splice(0, this.line_.length);

    var plantcode = {plantcode: this.employee[a].plant_code}
    this.service.line_dept_design(plantcode)
    .subscribe({
      next: (response) =>{ console.log(response); this.all_details = response;
        this.desig= this.all_details[0]
        this.dept= this.all_details[1]
        this.line= this.all_details[2]

        this.desig = this.desig.map((a:any)=>a.desig_name)
        this.dept= this.dept.map((a:any)=>a.dept_name)
        this.line = this.line.map((a:any)=>a.line_name)

      },
      error: (error) => console.log(error),
    });

    this.editing_flag = true
    this.form.controls['Emp_Name'].setValue(this.employee[a].Emp_Name)
    this.form.controls['gen_id'].setValue(this.employee[a].gen_id)
    this.form.controls['plant_name'].setValue(this.employee[a].plant_name)

    this.form.controls['dept_name'].setValue(this.employee[a].dept_name)
    this.form.controls['desig_name'].setValue(this.employee[a].desig_name)
    this.form.controls['Line_Name'].setValue(this.employee[a].Line_Name)

    this.form.controls['Mail_Id'].setValue(this.employee[a].Mail_Id)
    this.form.controls['Mobile_No'].setValue(this.employee[a].Mobile_No)
    this.form.controls['User_Name'].setValue(this.employee[a].User_Name)
    this.form.controls['Password'].setValue(this.employee[a].Password)

    this.form.controls['Is_HR'].setValue(this.employee[a].Is_HR)
    this.form.controls['Is_HRAppr'].setValue(this.employee[a].Is_HRAppr)
    this.form.controls['Is_Trainer'].setValue(this.employee[a].Is_Trainer)
    this.form.controls['Is_Supervisor'].setValue(this.employee[a].Is_Supervisor)
    this.form.controls['Is_ReportingAuth'].setValue(this.employee[a].Is_ReportingAuth)
    this.form.controls['Is_TOU'].setValue(this.employee[a].Is_TOU)
  }
  save()
  {
    

    this.service.addemployee(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);
      if(response.message == 'already')
      {
        alert('username already exists')
      }
    else
      {
        this.employee.push(this.form.value)
        this.form.reset()
        console.log(this.form.value)
      }}
    })    

    console.log(this.form.value)
  }

  editSave()
  {
    console.log(this.form.value)
    this.service.updateemployee(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);

      this.employee[this.temp_a] = this.form.value
      }
    })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any, slno:any)
{
  this.service.deleteemployee({empl_slno : slno})
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
