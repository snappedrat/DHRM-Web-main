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

  shift_1:any
  shift_2:any
  shift_3:any
  total_:any
  genl_:any
  excel:any = true
  shows: boolean;
  hides: boolean;
  excelfile: any;


  constructor(private fb : UntypedFormBuilder, private service : ApiService, private router: Router)
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
    var x = +date.getMonth()+1
    var y = date.getFullYear()
    this.getDetails(x, y)
    
  }

  getDetails(x:any, y:any)
  {
    this.excel = true
    var form = {year: y, month: x, plantcode: sessionStorage.getItem('plantcode')}
    this.f = form
    this.service.people_planning(form)
    .subscribe(
      {
        next: (response)=>{console.log(response);
          this.questions = response;
          for(var i=0; i< this.questions.length; i++)
          {
            if(this.questions[this.questions.length-1].plan_slno == undefined || this.questions[this.questions.length-1].plan_slno == null)
            {
              this.questions[i].shift1 = ''
              this.questions[i].shift2 = ''
              this.questions[i].shift3 = ''
              this.questions[i].genl = ''
              this.questions[i].total = ''

            }
          }
          this.excel = false
          }
      }
    )

  }
exportexcel(): void
{
  var ws = XLSX.utils.json_to_sheet(this.questions);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "People");
  XLSX.writeFile(wb,"monthlyplan.xlsx");
}


  show(event:any)
  {
    if(event.target.checked == true)
      this.shows = true
  }
  hide(event:any)
  {
    if(event.target.checked == true)
      this.shows = false
  }

  fileread(event:any)
  {
    var file = event.target.files[0]

    const fileReader = new FileReader()

    fileReader.readAsBinaryString(file)

    console.log(fileReader.result)
    console.log(file)

    fileReader.onload = (e)=>
    {
      var workbook = XLSX.read(fileReader.result, {type:'binary'})
      var sheetName = workbook.SheetNames
      this.excelfile = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]])
      console.log(this.excelfile)  
    }



  } 

  save()
  {
    this.excelfile[0].plant_code = sessionStorage.getItem('plantcode')
    this.excelfile[0].plant_year = this.f.year
    this.excelfile[0].plant_month = this.f.month
    this.excelfile[0].created_by = sessionStorage.getItem('emp_id')

    console.log(this.excelfile)

    if(this.excelfile[0].plan_slno == undefined)
    {
      this.service.people_planning_save(this.excelfile)
      .subscribe(
        {
          next:(response:any)=>{console.log(response)
        if(response.message == 'inserted')
        {
          alert("People Planning Added Successfully")
          this.ngOnInit()
        }}
        }
      )
    }
    else if(this.excelfile[0].plan_slno != undefined)
    {
      console.log("has to update")
      this.service.people_planning_update(this.excelfile)
      .subscribe(
        {
          next:(response:any)=>{console.log(response)
            if(response.message == 'updated')
            {
              alert("People Planning Updated Successfully")
              this.router.navigate(['/rml/people-planning/monthly'])
            }}
        }
      )
    }


  }






    // gen(event:any, i:any)
  // {    
  //   this.questions[i].genl_reqd = event.target.value

  //   this.questions[i].total_reqd = Number(this.questions[i].shift1_reqd == undefined ? 0: this.questions[i].shift1_reqd)
  //    +Number(this.questions[i].shift2_reqd  == undefined ? 0: this.questions[i].shift2_reqd)
  //   +Number(this.questions[i].shift3_reqd  == undefined ? 0: this.questions[i].shift3_reqd) 
  //   +Number(this.questions[i].genl_reqd  == undefined ? 0: this.questions[i].genl_reqd)

  //   console.log(this.questions[i])
  // }
  // total(i:any)
  // {
  //   this.questions[i].total_reqd = Number(this.questions[i].shift1_reqd) +Number(this.questions[i].shift2_reqd)
  //   +Number(this.questions[i].shift3_reqd) +Number(this.questions[i].genl_reqd)

  //   console.log(this.questions)

  // }
  // shift1(event:any, i:any)
  // {    
  //   this.questions[i].shift1_reqd = event.target.value

  //   this.questions[i].total_reqd = Number(this.questions[i].shift1_reqd == undefined ? 0: this.questions[i].shift1_reqd)
  //    +Number(this.questions[i].shift2_reqd  == undefined ? 0: this.questions[i].shift2_reqd)
  //   +Number(this.questions[i].shift3_reqd  == undefined ? 0: this.questions[i].shift3_reqd) 
  //   +Number(this.questions[i].genl_reqd  == undefined ? 0: this.questions[i].genl_reqd)

  //   console.log(this.questions[i])
  // }
  // shift2(event:any, i:any)
  // {    
  //   this.questions[i].shift2_reqd = event.target.value

    
  //   this.questions[i].total_reqd = Number(this.questions[i].shift1_reqd == undefined ? 0: this.questions[i].shift1_reqd)
  //    +Number(this.questions[i].shift2_reqd  == undefined ? 0: this.questions[i].shift2_reqd)
  //   +Number(this.questions[i].shift3_reqd  == undefined ? 0: this.questions[i].shift3_reqd) 
  //   +Number(this.questions[i].genl_reqd  == undefined ? 0: this.questions[i].genl_reqd)

  //   console.log(this.questions[i])
  // }
  // shift3(event:any, i:any)
  // {    
  //   this.questions[i].shift3_reqd = event.target.value

    
  //   this.questions[i].total_reqd = Number(this.questions[i].shift1_reqd == undefined ? 0: this.questions[i].shift1_reqd)
  //    +Number(this.questions[i].shift2_reqd  == undefined ? 0: this.questions[i].shift2_reqd)
  //   +Number(this.questions[i].shift3_reqd  == undefined ? 0: this.questions[i].shift3_reqd) 
  //   +Number(this.questions[i].genl_reqd  == undefined ? 0: this.questions[i].genl_reqd)

  //   console.log(this.questions[i])
  // }


    // addrow(i:any)
  // {
  //       if(i == this.questions.length-1)
  //       {
  //         this.questions.push({})
  //         this.inserted += 1;
  //       }
  // }

  }





