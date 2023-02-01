import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';

@Component({
  selector: 'app-onboard-form',
  templateUrl: './onboard-form.component.html',
  styleUrls: ['./onboard-form.component.css']
})
export class OnboardFormComponent implements OnInit {
  form:any
  ifsc_code:any
  grade:any = ['1','2','3','4']
  account_number: any
  department : any
  active_status: any = ['ACTIVE', 'INACTIVE']
  bank_name: any
  line: any
  b_id : any
  process_trained : any
  rfr: any = ['GOOD', 'BAD']
  b_num : any
  reporting_to : any
  uan : any
  w_contract : any = ['DIRECT', 'INDIRECT']
  trainee_id : any
  designation : any
  basic :any
  
  obj:any = []
  
  
  
  OnboardData = [
    // {
    //   'ifsc_code':'',
    //   'grade':'',
    //   'doj':'',
    //   'account_number':'',
    //   'department':'',
    //   'active_status':'',
    //   'bank_name':'',
    //   'line':'',
    //   'dol':'',
    //   'b_id':'',
    //   'process_trained':'',
    //   'rfr':'',
    //   'b_num':'',
    //   'reporting_to':'',
    //   'uan':'',
    //   'w_contract':'',
    //   'trainee_id':'',
    //   'designation':'',
    // }   
  ];

    flag: any = true;
    state: boolean;
  
    constructor(private fb : UntypedFormBuilder,private http: HttpClient, private active :ActivatedRoute, private service:ApiService ) {
    
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

    values:any
    
    ngOnInit(): void 
    {
      this.form.controls['bio_id'].setValue(false)

      this.service.getonboard({apln_slno : this.active.snapshot.paramMap.get('id')})
      .subscribe(
        {
          next: (response:any)=>
          {
           this.obj = response;
           this.basic = this.obj[0]
           this.designation = this.obj[1]
           this.department = this.obj[2]
           this.line = this.obj[3]
           this.process_trained = this.obj[4]
           this.reporting_to = this.obj[5]
           console.log(this.basic)

          this.form.controls['ifsc_code'].setValue(this.basic[0].ifsc_code)
          this.form.controls['account_number'].setValue(this.basic[0].bank_account_number)
          this.form.controls['bank_name'].setValue(this.basic[0].bank_name)

            this.line = this.line.map((line_name:any) => line_name.line_name)
            this.designation = this.designation.map((a:any) => a.desig_name)
            this.department = this.department.map((a:any) => a.dept_name)
            this.process_trained = this.process_trained.map((a:any) => a.oprn_desc)
            this.reporting_to = this.reporting_to.map((a:any) => a.emp_name)
          }
        }
      )
    }
    submit()
    {
      console.log(this.form.value)
    }
  
  sendData(){
   
  } 
}
