import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, UntypedFormBuilder} from '@angular/forms';
import {MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS}from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { isThisSecond } from 'date-fns';
import * as _moment from 'moment';
import {Moment} from 'moment';
import { ApiService } from 'src/app/home/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

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
  templateUrl: 'comp-off.component.html',
  styleUrls: ['comp-off.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CompOffComponent {

  form:any

  date = new FormControl(moment());
  dates:any
  data:any= ['']
  table_temp:any
  table_data:any = []
  temp_a: any;
  disable: number = 1;

  constructor(private service: ApiService, private fb: UntypedFormBuilder, private modalService: NgbModal)
  {
    this.form = this.fb.group(
      {
        worked_dt:[''],
        reason:[''],
        c_off_dt: [''],
        empid:[sessionStorage.getItem('user_name')]

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

  open(content:any, a:any)
  {
    this.modalService.open(content, {centered: true})
    this.temp_a = a
  }

  validate(event:any)
  {
    var form = {emp_id: sessionStorage.getItem('user_name'), coff_date: event.target.value, date: this.table_data[this.temp_a].date}
    console.log(form)
    this.service.coff_date_validation(form)
    .subscribe({
      next: (response:any)=>
        {
          console.log(response);
          if(response.message1 == 'Can Apply for comp off' )
          {
            this.disable = 0
          }
          else
            alert(response.message1)
        }
    })

  }

  reset()
  {
    this.form.reset()
  }
  save()
  {
    this.form.controls['worked_dt'].setValue(this.table_data[this.temp_a].date)
    this.service.emp_coff(this.form.value)
    .subscribe(
      {
        next:(response:any)=>{console.log(response)}
      }
    )
  }

}