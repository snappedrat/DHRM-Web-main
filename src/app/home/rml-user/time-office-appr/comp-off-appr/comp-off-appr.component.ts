import {FormControl} from '@angular/forms';
import {MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS}from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { Component, OnInit,ViewChild,Injectable, ViewContainerRef, TemplateRef, NgModule,ViewEncapsulation} from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
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
  selector: 'comp-off-appr',
  templateUrl: 'comp-off-appr.component.html',
  styleUrls: ['comp-off-appr.component.css'],
  encapsulation: ViewEncapsulation.None,
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


export class CompOffApprComponent {
  date = new FormControl(moment());

  emp_id:any
  dates:any
  data:any= ['']
  table_temp:any
  table_data:any = ['']
  temp_a: any;
  disable: number = 1;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
    var x:any = sessionStorage.getItem('all')
    x = JSON.parse(x)
    this.emp_id = x.gen_id
  }
  dummy: any  = ['']

  ngOnInit(): void {

    this.getDates()
  }

  open(content1:any, a:any)
  {
    this.temp_a = a
    console.log("opening")
    this.modalService.open(content1, {centered: true})
  }
  open1(content2:any, a:any)
  {
    this.temp_a = a
    console.log("opening")
    this.modalService.open(content2, {centered: true})
  }

  // chosenYearHandler(normalizedYear: Moment) {
  //   const ctrlValue = this.date.value!;
  //   ctrlValue.year(normalizedYear.year());
  //   this.date.setValue(ctrlValue);
  // }

  // chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) 
  // {
  //   const ctrlValue = this.date.value!;
  //   ctrlValue.month(normalizedMonth.month());
  //   this.date.setValue(ctrlValue);
  //   datepicker.close();
  //   var x = ctrlValue.month()+1

  //   if(x<10)
  //     var send = ctrlValue.year()+'/0'+x
  //   else
  //     var send = ctrlValue.year()+'/'+x

  //   this.getDates(send)
  // }
  getDates()
  {
    this.table_data = []
    var form = {id: this.emp_id}
    this.service.coffRequestDisplay(form)
    .subscribe(
      {
        next: (response:any)=>{console.log(response); this.table_data = response}
      }
    )
  }

  approve()
  {
    var form = 
    {
      statuslet: 'ACCEPT',
      executiveID: this.emp_id,
      date: this.table_data[this.temp_a].workedDate,
      coffDate:  this.table_data[this.temp_a].coffDate,
      empID: this.table_data[this.temp_a].EmpID
    }
    this.service.coffRequestStatus(form)
    .subscribe(
      {
        next: (response:any)=>
        {
          console.log(response)
          if(response.message == 'Success')
          {
            alert("The Request was Accepted")
            this.table_data.splice(this.temp_a, 1)
          }
        },
        error: (err)=>{console.log(err)}
      }
    )
  }
  reject()
  {
    var form = 
    {
      statuslet: 'REJECT',
      executiveID: this.emp_id,
      date: this.table_data[this.temp_a].workedDate,
      coffDate:  this.table_data[this.temp_a].coffDate,
      empID: this.table_data[this.temp_a].EmpID
    }
    console.log(form)
    this.service.coffRequestStatus(form)
    .subscribe(
      {
        next: (response:any)=>
        {
          console.log(response)
          if(response.message == 'Success')
          {
            alert("The Request was Rejected")
            this.table_data.splice(this.temp_a, 1)
          }
        },
        error: (err)=>{console.log(err)}
      }
    )    
  }

}


  



 

  