import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from 'src/app/home/api.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { isThisSecond } from 'date-fns';
@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})

export class EvaluationFormComponent implements OnInit {

  line:any
  department: any
  new_skill_lvl: any = [1,2,3,4]
  process_trained: any
  uniqueId :any = {'mobile':''}
  form:any    
  status: any = {'status': ''}
  formvalues: any
  address:any  = 'hello'

  cat:any = ''
  ln:any
  dept:any
  skill:any
  oprn:any
  name:any
  file:any
  readable:any = false

  nav:any

  url: any = environment.path
  obj: any;
  new: any;
      constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router, private modalService : NgbModal) {
    
        this.form = this.fb.group({
          evaluation_date: ['', Validators.required],
          score_obtained:['', Validators.required],
          score_for:['', Validators.required],
          percentage : ['', Validators.required],
          upload_file : [''],
          line: ['', Validators.required],
          department: ['', Validators.required],
          new_skill: ['', Validators.required],
          process_trained: ['', Validators.required],
          curr_dept: [''],
          curr_line: [''],
          curr_skill_level: [''],
          apln_slno:[this.active.snapshot.paramMap.get('id')],
          eval_days :[this.active.snapshot.paramMap.get('eval')],
          emp_slno : [sessionStorage.getItem('emp_id')],
          emp_name : [sessionStorage.getItem('emp_name')],
          line_name :[''],
          plantcode: [sessionStorage.getItem('plantcode')],
          pe_slno:['']

        });
    
       }
    
      ngOnInit(): void 
      {

        if(this.active.snapshot.paramMap.get('nav') == '1')
        {
          this.nav = '/rml/skill-developement/trainer-evaluation'
        }
        else if(this.active.snapshot.paramMap.get('nav') == '2')
        {
          this.nav = '/rml/skill-developement/supervisor-evaluation'
          this.readable = true
          this.form.controls['new_skill'].disable()
          this.form.controls['department'].disable()
          this.form.controls['line'].disable()
          this.form.controls['process_trained'].disable()

        }
        else
          this.nav = '/rml/skill-developement/evaluation-due'

        this.service.get_eval_form({apln_slno : this.active.snapshot.paramMap.get('id')})
        .subscribe({
          next: (response:any)=>
          {

            console.log(response)
            this.obj = response    
            
            try 
            {
              this.name = this.obj[0][0]?.fullname        
              this.cat = this.obj[0][0]?.desig_name        
              this.dept = this.obj[0][0]?.dept_name        
              this.ln = this.obj[0][0]?.line_name        
              this.skill = this.obj[0][0]?.new_level
              
              this.oprn = this.obj[1][0]?.oprn_desc
              this.department = this.obj[2]
              this.line = this.obj[3]
              this.process_trained = this.obj[4]

              console.log(this.obj[4])

              this.department = this.department.map((a:any)=>a.dept_name)
              this.line = this.line.map((a:any)=>a.line_name)
              this.process_trained = this.process_trained.map((a:any)=>a.oprn_desc)
  
              this.form.controls['curr_dept'].setValue(this.obj[0][0]?.dept_slno)
              this.form.controls['curr_line'].setValue(this.obj[0][0]?.line_code)
              this.form.controls['curr_skill_level'].setValue(this.obj[0][0]?.curr_skill)
              this.form.controls['line_name'].setValue(this.obj[0][0]?.line_name  )
              
            } catch (error) 
            {
              console.log(error)  
            }

          }
        })

        if(this.active.snapshot.paramMap.get('nav')== '2')
        {
          this.service.get_eval_sup({apln_slno : this.active.snapshot.paramMap.get('id')})
          .subscribe(
            {
              next:(response:any)=>
              {
                console.log(response)
                this.form.controls['evaluation_date'].setValue('2023-02-02')
                this.form.controls['score_obtained'].setValue(response[0][0].tnr_numerator)
                this.form.controls['score_for'].setValue(response[0][0].tnr_denominator)
                this.form.controls['percentage'].setValue(response[0][0].tnr_percentage)
                this.form.controls['line'].setValue(response[1][0].line_name)
                this.form.controls['pe_slno'].setValue(response[1][0].pe_slno)
                this.form.controls['department'].setValue(response[2][0].dept_name)
                this.form.controls['process_trained'].setValue(response[3][0].oprn_desc)
                this.form.controls['new_skill'].setValue(response[4][0].new_level)
              }
            }
          )
        }

      }
      submit()
      {
        if(this.active.snapshot.paramMap.get('nav')== '1')
        {
          this.form.controls['upload_file'].setValue(this.obj[0][0]?.apln_slno+'_'+'file1.'+this.new)
          this.service.eval_form(this.form.value)
          .subscribe({
            next: (response:any)=>{
              console.log(response);
              if(response.message == 'success')
                alert("Trainee has been Evaluated")
            }
          })
        }
        else if(this.active.snapshot.paramMap.get('nav')== '2')
        {try{this.form.controls['upload_file'].setValue(this.obj[0][0]?.apln_slno+'_'+'file2.'+this.new)}catch(err){console.log(err)}
        this.service.eval_form_sup(this.form.value)
        .subscribe({
          next: (response:any)=>{
            console.log(response);
            if(response.message == 'success')
            alert("Trainee has been Evaluated")
          }
        })
        }
        console.log(this.form.value)
      }
      files(event:any)
      {
        this.file = event.target.files[0]
        var file_local = this.file?.name.split('.')
        this.new = file_local?.pop()
      }
}