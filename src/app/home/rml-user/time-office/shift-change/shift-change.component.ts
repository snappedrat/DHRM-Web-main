import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../new-joiners/plantcode.service';
import { leadingComment } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
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



@Component({
  selector: 'app-shift-change',
  templateUrl: './shift-change.component.html',
  styleUrls: ['./shift-change.component.css'],
  animations: [
    trigger('slowAnimate', [
      transition(':enter', [style({opacity: '0'}), animate(500)]),
      transition(':leave', [style({opacity: '1'}), animate(500, style({opacity: '0'}))]),
    ])
  ]
  
})
export class ShiftChangeComponent implements OnInit {
  @Output() emit = new EventEmitter<any>()
  message = {'fam':false}
  message_bad = {'fam':true}
form:any
start_date: any = ['']
end_date: any = ['']
current_shift: any = ['']
preferred_shift : any = ['']
reliever_availability : any = ['']
reliever_name: any = ['']
reliever:any = 0
mobile_no1:any =
  {
    "mobile" : this.active.snapshot.paramMap.get('mobile_no1'),
    'company':  this.active.snapshot.paramMap.get('company')

  }


ShiftData = [
  {
    'start_date':'',
    'end_date':'',
    'current_shift':'',
    'preferred_shift':'',
    'reliever_availability':'',
    'reliever_name':''
  }


    
];
  flag: any = true;
  state: boolean;

  constructor(private fb : UntypedFormBuilder,private http: HttpClient, private cookie: CookieService,  private plantcodeService: PlantcodeService, private active :ActivatedRoute ) {
  
    this.form = this.fb.group({

      
      start_date: [''],
      end_date: [''],
      current_shift: [''],
      preferred_shift : [''],
      reliever_availability : [''],
      reliever_name:  ['']
   
    })

  }


  ngOnInit(): void {
   
  }
  submit(){
    console.log(this.form.value)
}


get(event:any)
{
  if(event.target.checked)
    this.reliever = 1
}
no(event:any)
{
  if(event.target.checked)
  this.reliever = 0
}

}