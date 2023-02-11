import { Component, OnInit,ViewChild,Injectable, ViewContainerRef, TemplateRef, NgModule,ViewEncapsulation} from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { environment } from "src/environments/environment.prod";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-forgot-punch',
  templateUrl: './forgot-punch.component.html',
  styleUrls: ['./forgot-punch.component.css']
})
export class ForgotPunchComponent implements OnInit {

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

  getDates()
  {
    this.table_data = []
    var form = {id: this.emp_id}
    this.service.forgotPunchRequestDisplay(form)
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
  window.print()
}
   
}
