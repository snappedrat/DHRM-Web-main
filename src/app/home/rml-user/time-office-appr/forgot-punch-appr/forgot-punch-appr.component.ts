import { Component, OnInit,ViewChild,Injectable, ViewContainerRef, TemplateRef, NgModule,ViewEncapsulation} from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { environment } from "src/environments/environment.prod";


@Component({
  selector: 'app-forgot-punch-appr',
  templateUrl: './forgot-punch-appr.component.html',
  styleUrls: ['./forgot-punch-appr.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPunchApprComponent implements OnInit {

  dates:any
  data:any= ['']
  table_temp:any
  table_data:any = ['']
  temp_a: any;
  disable: number = 1;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
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
    var form = {id: sessionStorage.getItem('user_name')}
    this.service.forgotPunchRequestDisplay(form)
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
      executiveID: sessionStorage.getItem('user_name'),
      date: this.table_data[this.temp_a].attDate,
      empID: this.table_data[this.temp_a].EmpID,
      inTime: this.table_data[this.temp_a].requestedIn,
      outTime: this.table_data[this.temp_a].requestedOut,
      actualInTime: this.table_data[this.temp_a].actualIn,
      actualOutTime: this.table_data[this.temp_a].actualOut
    }
    this.service.forgotPunchRequestStatus(form)
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
      executiveID: sessionStorage.getItem('user_name'),
      date: this.table_data[this.temp_a].attDate,
      empID: this.table_data[this.temp_a].EmpID,
      inTime: this.table_data[this.temp_a].requestedIn,
      outTime: this.table_data[this.temp_a].requestedOut,
      actualInTime: this.table_data[this.temp_a].actualIn,
      actualOutTime: this.table_data[this.temp_a].actualOut
    }
    console.log(form)
    this.service.forgotPunchRequestStatus(form)
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
