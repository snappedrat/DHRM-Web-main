import {FormControl} from '@angular/forms';
import {MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS}from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { Component, OnInit,ViewChild,Injectable, ViewContainerRef, TemplateRef, NgModule,ViewEncapsulation} from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
import { MatSidenav } from '@angular/material/sidenav';
import { ServiceService } from '../../masters/service.service';
import { User } from '../../masters/user/user';
import { MatTableModule } from '@angular/material/table';
import { Observable,Subject } from 'rxjs';
import { Options } from 'selenium-webdriver';
import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { environment } from "src/environments/environment.prod";

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {Moment} from 'moment';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
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


/** @title Datepicker emulating a Year and month picker */
@Component({
  selector: 'comp-off',
  templateUrl: 'comp-off-status.component.html',
  styleUrls: ['comp-off-status.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class CompOffStatusComponent {
  date = new FormControl(moment());

  dates:any
  data:any= ['']
  table_temp:any
  table_data:any = []
  temp_a: any;
  disable: number = 1;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    this.form = this.fb.group({
      work_date:[''],
     in_time :[''],
      out_time: [''],
      reasons: [''],
      coff_date: [''],
      coff_status: ['']
      
     
    })
   }
   closeResult: string;

  form:any

  sample : any = environment.path

  dummy: any 
  editing_flag: any;
  ngOnInit(): void {
    this.service.getbank().
    subscribe({
      next: (response)=>{this.dummy = response}
    })
  }

  open(content:any)
  {
    this.form.reset();
    this.editing_flag = false
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  save()
  {
    this.form.controls['Slno'].setValue(this.dummy.length+1)
    this.service.addbank(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);
      if(response.message == 'already')
      {
        alert('bank already exists')
      }
    else
      {
        this.dummy.push(this.form.value)

        this.form.reset()
      }}
    })    

  }
/////////////////////////////////////////////////////edit functions
  opentoedit(content:any)
  {
    console.log("opening")
    this.modalService.open(content, {centered: true})
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

    if(x<10)
      var send = ctrlValue.year()+'/0'+x
    else
      var send = ctrlValue.year()+'/'+x

    this.getDates(send)
  }
  getDates(date:any)
  {
    this.table_data = []
    var form = {date: date, id: sessionStorage.getItem('user_name')}

    this.service.coff_date(form)
    .subscribe(
      {
        next: (response:any)=>
        {
          console.log(response); this.data = response;
          for(var i=0; i<this.data.length; i++)
          {
            var f = {date: this.data[i].dates, emp_id: sessionStorage.getItem('user_name')}
            this.service.coff_details(f)
            .subscribe(
              {
                next: (response:any)=>
                {
                  console.log(response); this.table_temp = response;
                  this.table_data.push(this.table_temp);
                  console.log(this.table_data)
                }
              }
            )
          }
        },
        error: (err)=>{console.log(err)}
      })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any)
{
  this.service.deletebank(this.dummy[a])
  .subscribe({
    next: (response:any) =>{console.log(response); 
    if(response.message == 'success')
      this.dummy.splice(a,1)
  }
  })
}

exportexcel(): void
{
  var ws = XLSX.utils.json_to_sheet(this.dummy);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'bank_details.xlsx');
}

reset()
{
  this.form.reset()
}

setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
  const ctrlValue = this.date.value!;
  ctrlValue.month(normalizedMonthAndYear.month());
  ctrlValue.year(normalizedMonthAndYear.year());
  datepicker.close();

}
}


  



 

  