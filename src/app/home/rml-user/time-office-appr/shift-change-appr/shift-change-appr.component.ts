import {FormControl} from '@angular/forms';
import {MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS}from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { Component, OnInit,ViewChild,Injectable, ViewContainerRef, TemplateRef, NgModule,ViewEncapsulation} from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: 'app-shift-change-appr',
  templateUrl: './shift-change-appr.component.html',
  styleUrls: ['./shift-change-appr.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShiftChangeApprComponent implements OnInit {

  dates:any
  data:any= ['']
  table_temp:any
  table_data:any = ['']
  temp_a: any;
  disable: number = 1;
  emp_id: any;

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
    this.service.shiftChangeRequestDisplay(form)
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
      status: 'ACCEPT',
      executiveID: this.emp_id,
      date: this.table_data[this.temp_a].shiftChangeDate,
      end_date:  this.table_data[this.temp_a].shiftChangeEndDate,
      empID: this.table_data[this.temp_a].empID,
      actualShift: this.table_data[this.temp_a].actualShiftId,

    }
    this.service.shiftChangeRequestStatus(form)
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
      status: 'REJECT',
      executiveID: this.emp_id,
      date: this.table_data[this.temp_a].shiftChangeDate,
      end_date:  this.table_data[this.temp_a].shiftChangeEndDate,
      empID: this.table_data[this.temp_a].empID,
      actualShift: this.table_data[this.temp_a].actualShiftId,
    }
    console.log(form)
    this.service.shiftChangeRequestStatus(form)
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

}
