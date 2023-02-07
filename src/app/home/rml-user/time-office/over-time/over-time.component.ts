import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl, UntypedFormBuilder, Validators} from '@angular/forms';
import {MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS}from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {Moment} from 'moment';
import { ApiService } from 'src/app/home/api.service';

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
  selector: 'over-time',
  templateUrl: 'over-time.component.html',
  styleUrls: ['over-time.component.css'],
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
export class OverTimeComponent {
  form:any

  date = new FormControl(moment());
  dates:any
  data:any= ['']
  table_temp:any
  table_data:any = []
  temp_a: any;
  disable: number = 1;

  machine_id:any

  constructor(private service: ApiService, private fb: UntypedFormBuilder, private modalService: NgbModal)
  {
    this.form = this.fb.group(
      {
        ot_date:[''],
        work_carried_out:['', Validators.required],
        ot_hr: [''],
        id:[sessionStorage.getItem('user_name')],
        machine_id:['', Validators.required]
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

    this.service.ot_dates(form)
    .subscribe(
      {
        next: (response:any)=>
        {
          console.log(response); this.data = response;
          for(var i=0; i<this.data.length; i++)
          {
            var f = {date: this.data[i].dates, emp_id: sessionStorage.getItem('user_name')}
            this.service.ot_details(f)
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
        error: (err:any)=>{console.log(err)}
      })
  }

  open(content:any, a:any)
  {
    this.service.get_machine_id({id: sessionStorage.getItem('user_name')})
    .subscribe(
      {
        next: (response:any)=>{console.log(response); this.machine_id = response}
      }
    )

    this.modalService.open(content, {centered: true})
    this.temp_a = a
  }

  reset()
  {
    this.form.reset()
  }
  save()
  {
    this.form.controls['machine_id'].setValue(this.machine_id[this.form.controls['machine_id'].value.split('.')[0]-1].machine_id)
    this.form.controls['ot_date'].setValue(this.table_data[this.temp_a].date)
    this.form.controls['ot_hr'].setValue(this.table_data[this.temp_a].Overtime)
    console.log(this.form.value)
    this.service.ot_apply(this.form.value)
    .subscribe(
      {
        next:(response:any)=>
        {
          console.log(response);
          if(response.Message == 'Success')
            alert("OT applied Succesfully")
          else
            alert(response.Message)
        }
      }
    )
  }
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */