import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../new-joiners/plantcode.service';
import { leadingComment } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import { DateRangeFilterPipe } from '../../dateFilter.pipe';
import { LoaderserviceService } from 'src/app/loaderservice.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Timestamp } from 'rxjs';
import { threadId } from 'worker_threads';
import { ApiService } from 'src/app/home/api.service';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { AnyARecord } from 'dns';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-dept-transfer',
  templateUrl: './dept-transfer.component.html',
  styleUrls: ['./dept-transfer.component.css'],
  
})
export class DeptTransferComponent implements OnInit {
  someSubscription:any
  filterinfo:any = [
  ]
  id:any
  form:any
  page:any = 1
  pageSize:any = 50
  paginateData:any
  collectionSize:any = 0
  from:any = '2023-01-01'
  to:any = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd')
  searchText:any

  constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router, private modalService : NgbModal,public loader:LoaderserviceService) {

    this.form = this.fb.group({
      plantcode: [sessionStorage.getItem('plantcode')],
    });

   }

  ngOnInit(): void {

    console.log("00",this.form.value)

    this.service.depttransfer(this.form.value)
    .subscribe(
      {
        next: (response)=>{console.log(response); this.filterinfo = response;this.collectionSize = this.filterinfo.length;this.getPremiumData()        }
      }
    )
  }

  call(event:any)
  {
   this.from = event.target.value
   console.log(this.from)
   this.collectionSize = this.paginateData
  }
  call2(event:any)
  {
   this.to = event.target.value
   console.log(this.to);
   this.collectionSize = this.paginateData
   
  }


  save()
  {
    console.log(this.form.value)
  }

  getPremiumData(){
    this.paginateData =  this.filterinfo.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    console.log(this.collectionSize)

   }



}