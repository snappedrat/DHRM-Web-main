import {
  Component,
  OnInit,
  ViewChild,
  Injectable,
  ViewContainerRef,
  TemplateRef,
  NgModule,
  Inject,
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
import { ServiceService } from "../../masters/service.service";
import { User } from "../../masters/user/user";
import { MatTableModule } from "@angular/material/table";
import { Observable, Subject } from "rxjs";
import { Options } from "selenium-webdriver";
import { MatIcon } from "@angular/material/icon";





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
  templateUrl: './monthly-planning.component.html',
  styleUrls: ['./monthly-planning.component.css'],
})

export class MonthlyPlanningComponent implements OnInit {
  closeResult: string;

  form:any

  plantname:any

  temp_a:any
  sample : any = environment.path
  array:any = []

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

   

  save()
  {
    console.log(this.form.value)
      }
    

  }

/////////////////////////////////////////////////////edit functions





