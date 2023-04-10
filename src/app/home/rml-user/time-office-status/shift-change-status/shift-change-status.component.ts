import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';

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
  selector: 'shift-change',
  templateUrl: 'shift-change-status.component.html',
  styleUrls: ['shift-change-status.component.css'],
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


export class ShiftChangeStatusComponent {

  date = new FormControl(moment());

  dates:any
  data:any= ['']
  table_data:any = []
  temp_a: any;
  disable: number = 1;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
   }

   ngOnInit(): void {

    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()+1

    if(month<10)
    var send = year+'/0'+month
  else
    var send = year+'/'+month

    this.getDates(send)

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
    var form = {empID: sessionStorage.getItem('user_name'), date: date}
    this.service.shiftChangeStatus(form)
    .subscribe({
      next: (response:any)=>{console.log(response); this.table_data = response}
    })
  }


}


  



 

  