import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from 'src/app/home/api.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})

export class EvaluationFormComponent implements OnInit {

  line:any
  department: any
  new_skill_lvl: any = ['1','2','3','4']
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


  nav:any

  url: any = environment.path
  obj: any;
      constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router, private modalService : NgbModal) {
    
        this.form = this.fb.group({
          evaluation_date: [''],
          score_obtained:[''],
          score_for:[''],
          percentage : [''],
          upload_file : [''],
          line: [''],
          department: [''],
          new_skill: [''],
          process_trained: ['']
        });
    
       }
    
      ngOnInit(): void 
      {
        if(this.active.snapshot.paramMap.get('nav') == '1')
          this.nav = '/rml/skill-developement/trainer-evaluation'
        else if(this.active.snapshot.paramMap.get('nav') == '2')
          this.nav = '/rml/skill-developement/supervisor-evaluation'
        else
          this.nav = '/rml/skill-developement/evaluation-due'

        this.service.get_eval_form({apln_slno : this.active.snapshot.paramMap.get('id')})
        .subscribe({
          next: (response:any)=>
          {
            this.obj = response    
            
            this.name = this.obj[0][0].fullname        
            this.cat = this.obj[0][0].desig_name        
            this.dept = this.obj[0][0].dept_name        
            this.ln = this.obj[0][0].line_name        
            this.skill = this.obj[0][0].new_level
            
            this.oprn = this.obj[1][0].oprn_desc
            this.department = this.obj[2]
            this.line = this.obj[3]

            this.department = this.department.map((a:any)=>a.dept_name)
            this.line = this.line.map((a:any)=>a.line_name)

          }
        })

      }
      submit()
      {
        console.log(this.form.value)
      }
    
}