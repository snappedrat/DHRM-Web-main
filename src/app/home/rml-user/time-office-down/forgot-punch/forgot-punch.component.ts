import { Component, OnInit,ViewChild,Injectable, ViewContainerRef, TemplateRef, NgModule,ViewEncapsulation} from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { environment } from "src/environments/environment.prod";

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

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService) {
  }
  dummy: any  = ['']

  ngOnInit(): void {

    this.getDates()
  }

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
   
}
