import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-onboard-form',
  templateUrl: './onboard-form.component.html',
  styleUrls: ['./onboard-form.component.css']
})
export class OnboardFormComponent implements OnInit {
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
  
    constructor(private fb : UntypedFormBuilder,private http: HttpClient, private active :ActivatedRoute ) {
    
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
      bio_id:[''],
      process_trained:[''],
      rfr:[''],
      bnum:[''],
      reportingto:[''],
      uan:[''],
      wcontract:[''],
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
