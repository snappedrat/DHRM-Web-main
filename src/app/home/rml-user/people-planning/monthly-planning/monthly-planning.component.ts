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

  questions: any = [{}]
  inserted:any = 1
  form:any

  constructor(private fb : UntypedFormBuilder)
  {
    this.form = this.fb.group
    (
      {
        department:[],
        line: [],
        shift1:[],
        shift2:[],
        shift3:[]
      }
    )

  }

  ngOnInit(): void {
    
  }

  addrow(i:any)
  {
        if(i == this.questions.length-1)
        {
          this.questions.push({})
          this.inserted += 1;
        }
  }

  dept(event:any, i:any)
  {    
    this.questions[i].dept = event.target.value
    console.log(this.questions[i])
  }
  line(event:any, i:any)
  {    
    this.questions[i].line = event.target.value
    console.log(this.questions[i])
  }
  shift1(event:any, i:any)
  {    
    this.questions[i].shift1 = event.target.value
    console.log(this.questions[i])
  }
  shift2(event:any, i:any)
  {    
    this.questions[i].shift2 = event.target.value
    console.log(this.questions[i])
  }
  shift3(event:any, i:any)
  {    
    this.questions[i].shift3 = event.target.value
    console.log(this.questions[i])
  }
  save()
  {
    console.log(this.questions)
  }

  }





