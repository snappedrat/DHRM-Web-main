import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../new-joiners/plantcode.service';
import { leadingComment } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder, Validators} from '@angular/forms';

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

current_shift: any = []
preferred_shift : any = []

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

  constructor(private fb : UntypedFormBuilder,private http: HttpClient, private service: ApiService, private active :ActivatedRoute ) {
  
    this.form = this.fb.group({

      
      date: ['', Validators.required],
      end_date: ['', Validators.required],
      current_shift: ['', Validators.required],
      actual_shift : ['', Validators.required],
      reliever_id:  [null],
      emp_id: [sessionStorage.getItem("user_name")]
   
    })

  }


  ngOnInit(): void {

    var form = {id: sessionStorage.getItem('user_name')}
    this.service.shift_change_shifts(form)
    .subscribe(
      {
        next: (response:any)=>{console.log(response); this.current_shift = response }
      }
    )
   
  }
  submit()
  {

    if(this.form.controls['reliever_id'].value != null)
    {
      this.form.controls['reliever_id'].setValue(this.reliever_name[this.form.controls['reliever_id'].value.split('.')[0]-1].apln_slno)
    }
    this.form.controls['actual_shift'].setValue(this.current_shift[this.form.controls['actual_shift'].value.split('.')[0]-1].shift_id)
    this.form.controls['current_shift'].setValue(this.current_shift[this.form.controls['current_shift'].value.split('.')[0]-1].shift_id)



    console.log(this.form.value)

    this.service.shift_change(this.form.value)
    .subscribe(
      {
        next: (response:any)=>
        {
        console.log(response); 
        if(response.message == "success")
          alert("Shift change has been applied")
        else
          alert(response.message)
        location.reload()
        }
      }
    )
    
  }


get(event:any)
{
  if(event.target.checked)
    this.reliever = 1
  
  var form = {id: sessionStorage.getItem('user_name')}
    this.service.shift_change_reliever_name(form)
    .subscribe(
      {
        next: (response:any)=>{console.log(response); this.reliever_name = response }
      }
    )
}
no(event:any)
{
  if(event.target.checked)
  this.reliever = 0
}

}