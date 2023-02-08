import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { el } from 'date-fns/locale';
import { ApiService } from 'src/app/home/api.service';
import { threadId } from 'worker_threads';
import * as XLSX from'xlsx'

@Component({
  selector: 'app-onboard-form',
  templateUrl: './onboard-form.component.html',
  styleUrls: ['./onboard-form.component.css']
})
export class OnboardFormComponent implements OnInit {
  form:any
  ifsc_code:any
  grade:any = [1,2,3,4]
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
  status: any = this.active.snapshot.paramMap.get('apln_status')
  down:any
  
  readonly:boolean = (this.status == 'APPOINTED')? true : false

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
    category: any;
    cat: any;
  oprn: any;
  setting: number;
  true: boolean = false;
  
    constructor(private fb : UntypedFormBuilder,private http: HttpClient, private router: Router, private active :ActivatedRoute, private service:ApiService ) {
    
      this.form = this.fb.group({
        
      ifsc_code:[''],
      grade:[''],
      doj:['', Validators.required],
      account_number:[''],
      department:[''],
      active_status:['ACTIVE'],
      bank_name:[''],
      line:[''],
      dol:[''],
      bio_id:[''],
      process_trained:[''],
      rfr:[''],
      bnum:['', Validators.required],
      reportingto:[''],
      uan:['', [Validators.required ,Validators.maxLength(12)]],
      wcontract:[''],
      trainee_id:[''],
      designation:[''],
      plantcode:[sessionStorage.getItem('plantcode')],
      apln_slno:[''],
      category:['']
  
      })
  
    }

    values:any
    
    ngOnInit(): void 
    {


      if(this.readonly)
      {
        var control = this.form.get('dol')
        control.setValidators([Validators.required]);
        var control = this.form.get('rfr')
        control.setValidators([Validators.required]);
      }

      this.form.controls['bio_id'].setValue(false)

      this.service.getonboard({apln_slno : this.active.snapshot.paramMap.get('id'), readonly: this.readonly  })
      .subscribe(
        {
          next: (response:any)=>
          {
          console.log("5555", response)
           this.obj = response;
           this.basic = this.obj[0]
           this.designation = this.obj[1]
           this.department = this.obj[2]
           this.line = this.obj[3]
           this.process_trained = this.obj[4]
           this.reporting_to = this.obj[5]
           this.category = this.obj[6]
           this.oprn = this.obj[7]

          this.form.controls['ifsc_code'].setValue(this.basic[0]?.ifsc_code)
          this.form.controls['account_number'].setValue(this.basic[0]?.bank_account_number)
          this.form.controls['bank_name'].setValue(this.basic[0]?.bank_name)
          this.form.controls['apln_slno'].setValue(this.basic[0]?.apln_slno)

          if(this.readonly == false)
            this.form.controls['active_status'].disable()

          if(this.readonly == true)
          {
            this.form.controls['grade'].setValue(this.basic[0]?.emp_grade)
            this.form.controls['department'].setValue(this.basic[0]?.dept_name)
            this.form.controls['designation'].setValue(this.basic[0]?.desig_name)
            this.form.controls['line'].setValue(this.basic[0]?.line_name)
            this.form.controls['process_trained'].setValue(this.basic[0]?.oprn_desc)
            this.form.controls['bnum'].setValue(this.basic[0]?.biometric_no)
            this.form.controls['bio_id'].setValue(true)
            this.form.controls['uan'].setValue(this.basic[0]?.uan_number)
            this.form.controls['trainee_id'].setValue(this.basic[0]?.gen_id)
            this.form.controls['reportingto'].setValue(this.basic[0]?.emp_name)
            this.form.controls['wcontract'].setValue('DIRECT')
            this.form.controls['doj'].setValue(this.basic[0]?.doj)
            this.form.controls['active_status'].setValue(this.basic[0]?.activestat)
            if(this.form.controls['active_status'].value == 'ACTIVE')
            {
              this.form.controls['rfr'].disable()
              this.form.controls['dol'].disable()
            }


            this.form.controls['category'].setValue(this.basic[0]?.apprentice_type)

            this.form.controls['department'].disable()
            this.form.controls['designation'].disable()
            this.form.controls['line'].disable()
            this.form.controls['grade'].disable()
            this.form.controls['reportingto'].disable()
            this.form.controls['wcontract'].disable()
            this.form.controls['designation'].disable()
            this.form.controls['doj'].disable()
            this.form.controls['category'].disable()

          }
          else
          {
            this.form.controls['rfr'].disable()            
            this.form.controls['dol'].disable()            

          }

            this.line = this.line.map((line_name:any) => line_name.line_name)
            this.designation = this.designation.map((a:any) => a.desig_name)
            this.department = this.department.map((a:any) => a.dept_name)
            this.process_trained = this.process_trained.map((a:any) => a.oprn_desc)
            this.reporting_to = this.reporting_to.map((a:any) => a.emp_name)
            this.cat = this.category.map((a:any) => a.categorynm)
            this.oprn = this.oprn.map((a:any) => a.oprn_desc)
          }
        }
      )
    }
    get pc()
    {
      return this.form.controls
    }

    call(event:any)
    {
      if(this.form.get('uan').value.toString().length  > 12)
        this.true = true
      else
        this.true = false
    }

    submit()
    {
      
      console.log(this.form.value)

      if(this.readonly == false)
      {
        this.service.onboard_form(this.form.value)
        .subscribe({
          next: (response:any)=>{console.log(response);
          if(response.message == 'success')
          {
            alert('The Employee has been Appointed');
            this.router.navigate(['/rml/new_joiners/onboard'])
            if(this.setting == 1)
            this.exportexcel();
          }

            },
          error: (err)=>{console.log(err)}
        })
      }
      else if(this.readonly == true)
      {
        this.service.relieve(this.form.value)
        .subscribe({
          next: (response:any)=>{console.log(response);
            if(response.message == 'success')
            {
              alert('The Employee has been Relieved ')
              this.router.navigate(['/rml/new_joiners/onboard'])
            }
          },
          error: (err)=>{console.log(err)}
        })
      }
    }

    change(event:any)
    {
      console.log(event.target.value)

      if(event.target.value.split(':')[1].trim() == 'INACTIVE')
      {
        this.form.controls['dol'].enable()
        this.form.controls['rfr'].enable()
      }
      else if(event.target.value.split(':')[1].trim() == 'ACTIVE')
      {
        this.form.controls['dol'].disable()
        this.form.controls['rfr'].disable()
      }

    }

    gen_id(event:any)
    {
      var value = event.target.value
      console.log(value)
      if(this.category[value.split(':')[0]-1].file_drop == '1')
      {
        this.setting = 1
        this.form.controls['trainee_id'].setValue()
        this.service.filedrop({apln_slno: this.active.snapshot.paramMap.get('id')})
        .subscribe(
          {
            next: (response)=>{console.log(response);this.down = response}
          }
        )
        {

        }
      }
      else
      this.form.controls['trainee_id'].setValue(value.split(' ')[1].split('')[0]+this.active.snapshot.paramMap.get('id'))
    }

    exportexcel()
    {
      var ws = XLSX.utils.json_to_sheet(this.down)
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'people')
      XLSX.writeFile(wb, 'onboard.xlsx')
  
    }

}
