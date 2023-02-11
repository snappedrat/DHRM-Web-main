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
import {MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS}from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';




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

import * as _moment from 'moment';
import {Moment} from 'moment';
import { MatDatepicker } from "@angular/material/datepicker";
import { isThisSecond } from "date-fns";

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
  
};


 

@Component({
  selector: 'app-dept',
  templateUrl: './monthly-planning.component.html',
  styleUrls: ['./monthly-planning.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class MonthlyPlanningComponent implements OnInit {
  date = new FormControl(moment());

  questions: any = [{}]
  inserted:any = 1
  form:any
  f: { year: any; month: any; plantcode: string | null; };

  constructor(private fb : UntypedFormBuilder, private service : ApiService)
  {
    this.form = this.fb.group
    (
      {
      year:[''],
      month:[''],
      plant_code:[sessionStorage.getItem('plantcode')]
      }
    )
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value!;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) 
  {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    var x = ctrlValue.month()+1
    var y = ctrlValue.year()
    console.log(x, y)

    if(x<10)
      var send = ctrlValue.year()+'/0'+x
    else
      var send = ctrlValue.year()+'/'+x

    this.getDetails(x,y)
  }

  ngOnInit(): void {

    var date = new Date()
    var x = Number(date.getMonth)+1
    var y = date.getFullYear()
    this.getDetails(x, y)
    
  }

  getDetails(x:any, y:any)
  {
    var form = {year: y, month: x, plantcode: sessionStorage.getItem('plantcode')}
    this.f = form
    this.service.people_planning(form)
    .subscribe(
      {
        next: (response)=>{console.log(response);
          this.questions = response}
      }
    )

  }

  addrow(i:any)
  {
        if(i == this.questions.length-1)
        {
          this.questions.push({})
          this.inserted += 1;
        }
  }

  gen(event:any, i:any)
  {    
    this.questions[i].genl_reqd = event.target.value
    console.log(this.questions[i])
  }
  total(event:any, i:any)
  {    
    this.questions[i].total_reqd = Number(this.questions[i].shift1_reqd) +Number(this.questions[i].shift2_reqd)
    +Number(this.questions[i].shift3_reqd) +Number(this.questions[i].genl_reqd)

  }
  shift1(event:any, i:any)
  {    
    this.questions[i].shift1_reqd = event.target.value
    console.log(this.questions[i])
  }
  shift2(event:any, i:any)
  {    
    this.questions[i].shift2_reqd = event.target.value
    console.log(this.questions[i])
  }
  shift3(event:any, i:any)
  {    
    this.questions[i].shift3_reqd = event.target.value
    console.log(this.questions[i])
  }
  save()
  {
    this.questions.push({})
    this.questions[this.questions.length-1].plant_code = sessionStorage.getItem('plantcode')
    this.questions[this.questions.length-1].plant_year = this.f.year
    this.questions[this.questions.length-1].plant_month = this.f.month
    this.questions[this.questions.length-1].created_by = sessionStorage.getItem('emp_name')

    console.log(this.questions)

    this.service.people_planning_save(this.questions)
    .subscribe(
      {
        next:(response)=>{console.log(response)}
      }
    )
  }

  }





