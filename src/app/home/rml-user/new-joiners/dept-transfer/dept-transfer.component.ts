import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../new-joiners/plantcode.service';
import { leadingComment } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';

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



@Component({
  selector: 'app-dept-transfer',
  templateUrl: './dept-transfer.component.html',
  styleUrls: ['./dept-transfer.component.css'],
  
})
export class DeptTransferComponent implements OnInit {
  someSubscription:any
  filterinfo:any = []
  id:any
  form:any

  constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router, private modalService : NgbModal) {

    this.form = this.fb.group({
      plantcode: [sessionStorage.getItem('plantcode')],
    });

   }

  ngOnInit(): void {

    console.log("00",this.form.value)

    this.service.depttransfer(this.form.value)
    .subscribe(
      {
        next: (response)=>{console.log(response); this.filterinfo = response}
      }
    )
  }

  save()
  {
    console.log(this.form.value)
  }



}