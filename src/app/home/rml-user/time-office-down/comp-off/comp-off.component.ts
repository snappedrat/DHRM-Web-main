import {FormControl} from '@angular/forms';
import {MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS}from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { Component, OnInit,ViewChild,Injectable, ViewContainerRef, TemplateRef, NgModule,ViewEncapsulation} from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { environment } from "src/environments/environment.prod";
import { MatIcon } from '@angular/material/icon';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-comp-off',
  templateUrl: './comp-off.component.html',
  styleUrls: ['./comp-off.component.css']
})
export class CompOffComponent implements OnInit {

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

  // open(content1:any, a:any)
  // {
  //   this.temp_a = a
  //   console.log("opening")
  //   this.modalService.open(content1, {centered: true})
  // }
  // open1(content2:any, a:any)
  // {
  //   this.temp_a = a
  //   console.log("opening")
  //   this.modalService.open(content2, {centered: true})
  // }

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
    this.service.coffRequestDisplay(form)
    .subscribe(
      {
        next: (response:any)=>{console.log(response); this.table_data = response}
      }
    )
  }

exportexcel(): void
{
  let element = document.getElementById('table');
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'comp-off.xlsx');
}

  // approve()
  // {
  //   var form = 
  //   {
  //     statuslet: 'ACCEPT',
  //     executiveID: sessionStorage.getItem('user_name'),
  //     date: this.table_data[this.temp_a].workedDate,
  //     coffDate:  this.table_data[this.temp_a].coffDate,
  //     empID: this.table_data[this.temp_a].EmpID
  //   }
  //   this.service.coffRequestStatus(form)
  //   .subscribe(
  //     {
  //       next: (response:any)=>
  //       {
  //         console.log(response)
  //         if(response.message == 'Success')
  //         {
  //           alert("The Request was Accepted")
  //           this.table_data.splice(this.temp_a, 1)
  //         }
  //       },
  //       error: (err)=>{console.log(err)}
  //     }
  //   )
  // }
  // reject()
  // {
  //   var form = 
  //   {
  //     statuslet: 'REJECT',
  //     executiveID: sessionStorage.getItem('user_name'),
  //     date: this.table_data[this.temp_a].workedDate,
  //     coffDate:  this.table_data[this.temp_a].coffDate,
  //     empID: this.table_data[this.temp_a].EmpID
  //   }
  //   console.log(form)
  //   this.service.coffRequestStatus(form)
  //   .subscribe(
  //     {
  //       next: (response:any)=>
  //       {
  //         console.log(response)
  //         if(response.message == 'Success')
  //         {
  //           alert("The Request was Accepted")
  //           this.table_data.splice(this.temp_a, 1)
  //         }
  //       },
  //       error: (err)=>{console.log(err)}
  //     }
  //   )    
  // }
}
