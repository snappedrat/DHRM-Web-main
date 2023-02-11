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

  pp:any
  line:any
  department: any
  new_skill_lvl: any = [1,2,3,4]
  process_trained: any
  uniqueId :any = {'mobile':''}
  form:any    
  status: any = {'status': ''}
  formvalues: any
  address:any  = 'hello'
  image:any
  cat:any = ''
  ln:any
  dept:any
  skill:any
  oprn:any 
  name:any
  file:any
  readable:any = false
  appr:any = false

  nav:any

  url: any = environment.path
  obj: any;
  new: any;
  pt: any;
  trainee_idno: any;
  uploaded: any;
  uploaded2: any;
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

        this.appr = (this.active.snapshot.paramMap.get('nav') == '3') ? true : false

        if(this.active.snapshot.paramMap.get('nav') == '1')
        {
          this.nav = '/rml/skill-developement/trainer-evaluation'
        }
        else if(this.active.snapshot.paramMap.get('nav') == '2' || this.active.snapshot.paramMap.get('nav') == '3')
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
            this.obj = response;
            this.image = this.url+'/'+this.obj[0][0]?.other_files6;

            
            try 
            {
              this.name = this.obj[0][0]?.fullname        
              this.cat = this.obj[0][0]?.apprentice_type        
              this.dept = this.obj[0][0]?.dept_name        
              this.ln = this.obj[0][0]?.line_name        
              this.skill = this.obj[0][0]?.new_level
              this.trainee_idno = this.obj[0][0]?.apln_slno
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

        if(this.active.snapshot.paramMap.get('nav')== '2' || this.active.snapshot.paramMap.get('nav')== '3')
        {
          this.service.get_eval_sup({apln_slno : this.active.snapshot.paramMap.get('id')})
          .subscribe(
            {
              next:(response:any)=>
              {
                console.log(response)

                this.pt = response[3]

                this.pt = this.pt.map((a:any)=>a.oprn_desc)

                this.form.controls['evaluation_date'].setValue('2023-02-02')
                this.form.controls['score_obtained'].setValue(response[0][0]?.tnr_numerator)
                this.form.controls['score_for'].setValue(response[0][0]?.tnr_denominator)
                this.form.controls['percentage'].setValue(response[0][0]?.tnr_percentage)
                this.form.controls['line'].setValue(response[1][0]?.line_name)
                this.form.controls['pe_slno'].setValue(response[1][0]?.pe_slno)
                this.form.controls['department'].setValue(response[2][0]?.dept_name)
                this.form.controls['process_trained'].setValue(this.pt)
                this.form.controls['new_skill'].setValue(response[4][0]?.new_level)
                this.uploaded = this.url+'/skill_dev/'+response[0][0]?.tnr_filename
                this.uploaded2 = this.url+'/skill_dev/'+response[0][0]?.sup_filename
              }
            }
          )
        }

      }
      submit()
      {
        if(this.active.snapshot.paramMap.get('nav')== '1')
        {
          this.form.controls['upload_file'].setValue(this.trainee_idno+'_'+'tnr_eval'+'.'+this.new)
          this.service.eval_form(this.form.value)
          .subscribe({
            next: (response:any)=>{
              console.log(response);
              if(response.message == 'success')
              {
                alert("Trainee has been Evaluated")
                this.router.navigate(['/rml/skill-developement/trainer-evaluation'])
              }
            }
          })
        }
        else if(this.active.snapshot.paramMap.get('nav')== '2')
        {try{this.form.controls['upload_file'].setValue(this.trainee_idno+'_'+'sup_eval'+'.'+this.new)}catch(err){console.log(err)}
        this.service.eval_form_sup(this.form.value)
        .subscribe({
          next: (response:any)=>{
            console.log(response);
            if(response.message == 'success')
            {
              alert("Trainee has been Evaluated")
              this.router.navigate(['/rml/skill-developement/supervisor-evaluation'])
            }
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

        var formData = new FormData()
        if(this.readable == true)
          formData.append("file", event.target.files[0], this.trainee_idno+'_'+'sup_eval'+'.'+this.new )
        else
          formData.append("file", event.target.files[0], this.trainee_idno+'_'+'tnr_eval'+'.'+this.new )


        this.service.skill_dev(formData)
        .subscribe(
          {
            next: (response)=>{console.log(response)}
          }
        )

      }
      cal()
      {
        var a = this.form.controls['score_for'].value
        var b = this.form.controls['score_obtained'].value
        var c = Math.round((b/a)*100)
        this.form.controls['percentage'].setValue(c)
      }
}