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
  selector: 'app-dept-transfer',
  templateUrl: './dept-transfer.component.html',
  styleUrls: ['./dept-transfer.component.css'],
  
})
export class DeptTransferComponent implements OnInit {
form:any
gen_id: any 
current_department: any 
current_line: any 
changedepartment : any
changeline : any
reportingto: any 



Shiftata = [
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













    'change_line':'',
    'reportingto':''
  }


    
];
  flag: any = true;
  state: boolean;

  constructor(private fb : UntypedFormBuilder,private http: HttpClient, private cookie: CookieService,  private plantcodeService: PlantcodeService, private active :ActivatedRoute ) {
  
    this.form = this.fb.group({
      
      gen_id: [''],
      current_department: [''],
      current_line: [''],
      changedepartment : [''],
      changeline : [''],
      reportingto:  ['']
   
    })

  }


  ngOnInit(): void {
   
  }
  submit(){

}

sendData(){
 
} 


}