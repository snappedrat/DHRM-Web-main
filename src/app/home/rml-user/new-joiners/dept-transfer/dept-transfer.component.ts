import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderserviceService } from 'src/app/loaderservice.service';

import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/home/api.service';



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
  department: any
  dept: any;

  constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router, private modalService : NgbModal,public loader:LoaderserviceService) {

    this.form = this.fb.group({
      plantcode: [sessionStorage.getItem('plantcode')],
    });

   }

  ngOnInit(): void {


    this.service.dept_line_report({plantcode: sessionStorage.getItem('plantcode')})
    .subscribe(
      {
        next: (response:any)=>
        {
          console.log(response);
          this.department = response[1]
        }
      }
    )

    this.service.depttransfer(this.form.value)
    .subscribe(
      {
        next: (response)=>{console.log(response); this.filterinfo = response;this.collectionSize = this.filterinfo.length;this.getPremiumData()        }
      }
    )
  }
  filter()
  {
    this.service.onboard(this.form.value)
    .subscribe(
      {
        next:
      (response:any)=>
      {
        console.log(response); 
        this.filterinfo = response;
      }
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