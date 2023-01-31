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
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css'],
  
})
export class OnboardComponent implements OnInit {
form:any
ifsc_code:any
grade:any 
doj: any
account_number: any
department : any
 active_status: any
bank_name: any
line: any
dol:any 
b_id : any
process_trained : any
rfr: any
b_num : any
reporting_to : any
uan : any
w_contract : any
trainee_id : any
designation : any




OnboardData = [
  {
    'ifsc_code':'',
    'grade':'',
    'doj':'',
    'account_number':'',
    'department':'',
    'active_status':'',
    'bank_name':'',
    'line':'',
    'dol':'',
    'b_id':'',
    'process_trained':'',
    'rfr':'',
    'b_num':'',
    'reporting_to':'',
    'uan':'',
    'w_contract':'',
    'trainee_id':'',
    'designation':'',

  }


    
];
  flag: any = true;
  state: boolean;

  constructor(private fb : UntypedFormBuilder,private http: HttpClient, private cookie: CookieService,  private plantcodeService: PlantcodeService, private active :ActivatedRoute ) {
  
    this.form = this.fb.group({
      
    ifsc_code:[''],
    grade:[''],
    doj:[''],
    account_number:[''],
    department:[''],
    active_status:[''],
    bank_name:[''],
    line:[''],
    dol:[''],
    b_id:[''],
    process_trained:[''],
    rfr:[''],
    b_num:[''],
    reporting_to:[''],
    uan:[''],
    w_contract:[''],
    trainee_id:[''],
    designation:['']

    })

  }


  ngOnInit(): void {
   
  }
  submit(){

}

sendData(){
 
} 


}