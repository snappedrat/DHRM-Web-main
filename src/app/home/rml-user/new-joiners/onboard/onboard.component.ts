import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../new-joiners/plantcode.service';
import { leadingComment } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import * as XLSX from 'xlsx';
import { DateRangeFilterPipe } from '../../dateFilter.pipe';


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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css'],
  
})
export class OnboardComponent implements OnInit {


  select:any = ['APPOINTED', 'TRAINING COMPLETED']
  someSubscription:any
  filterinfo:any = [
  ]
  id:any
  form:any
  searchText:any
  page:any = 1
  pageSize:any = 50
  data:any
  collectionSize:any = 0
  from:any = '2023-01-01'
  to:any = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd')

  constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router, private modalService : NgbModal) {

    this.form = this.fb.group({
      plantcode: [sessionStorage.getItem('plantcode')],
      select : ['APPOINTED']

    });

   }

  ngOnInit(): void {

    this.filter()

  }

  call(event:any)
  {
   this.from = event.target.value
   console.log(this.from)
  }
  call2(event:any)
  {
   this.to = event.target.value
   console.log(this.to);
   
  }

  getPremiumData()
  {
    this.data =  this.filterinfo.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
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

  exportexcel()
  {
    var ws = XLSX.utils.json_to_sheet(this.filterinfo)
    var wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'people')
    XLSX.writeFile(wb, 'onboard.xlsx')

  }


}