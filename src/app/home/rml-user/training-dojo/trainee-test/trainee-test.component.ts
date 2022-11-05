import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, UntypedFormGroup, UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { threadId } from 'worker_threads';
import { truncate } from 'fs';
import { isThisSecond } from 'date-fns';

@Component({
  selector: 'app-trainee-test',
  templateUrl: './trainee-test.component.html',
  styleUrls: ['./trainee-test.component.css']
})
export class TraineeTestComponent implements OnInit {

  form:FormGroup =new FormGroup({})
  formtest:FormGroup =new FormGroup({})
  ind :any
  loading:any = false
  modules :any
  questions:any
  answers:any = [{
    'username' : this.active.snapshot.paramMap.get('username'),
    'module' : '',
    'pf': '',
    'percent' :'',
    'priorityval' :''
  }
]
  test:any = ['pre-test', 'post-test']
  score: number[] = [0 ,1]
  mark:any = 0
  qualified:any = 'you are qualified'

  username = {'username': this.active.snapshot.paramMap.get('username')}

  choices = ['A','B','C','D']

  constructor(private fb: UntypedFormBuilder, private service: ApiService, private active: ActivatedRoute, private router:Router) {


    this.form = fb.group({
      module: [''],
      test:[''],
      username: [this.active.snapshot.paramMap.get('username')]
    })
    this.formtest = fb.group({
      answers: [''],
    })
   }

  ngOnInit(): void {
    console.log(this.form.value);
    this.service.getModules(this.username)
    .subscribe({
      next: (response)=>{console.log(response); this.modules = response},
      error: (error)=>console.log(error)
    })
  }

Qualified(event:any)
{
  this.loading = true

    this.service.getTest(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
        this.form.controls['test'].setValue(response.test)
  }})

  this.answers[0].module = this.form.controls['module'].value
  this.ind = event.target.value.split('.')[0]

  this.answers[0].priorityval = this.modules[this.ind-1].priorityval

console.log(this.modules[this.ind-1].pass_criteria)

  this.service.Qualified(this.form.value)
  .subscribe({
    next: (response:any)=>{console.log(response)

      if(response.message == 'passed' || response.message == 'failed')
      {
        this.qualified = 'you have already written the exam'
        this.getQuestions(true)
      }
      else if(response.message == 'not qualified')
      {
        this.qualified = 'you are not qualified' 
        this.getQuestions(false)
      }
      else if(response.message == 'qualified')
      {
        this.qualified = 'you are qualifed'
        this.getQuestions(true)
      }     
      else if(response.message == 'post-test')
      {
        this.qualified = 'you are qualifed'
        this.getQuestions(true)
      }
      
    },
    error : (error) =>{console.log(error);
    }
  })
  

}

getQuestions(message:any)
{
  if(message == true)
  {
    this.service.getQuestions(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);this.questions = response;
        this.loading = false}
    })
  }
  else
    this.loading = false
    this.questions = []

}

submit()
{
  this.answers[0].curr_total = this.mark
  this.answers[0].pf = this.modules[this.ind-1].pass_criteria <= this.mark ? 'p' : 'f'
  this.answers[0].percent = ((this.mark) / (this.modules[this.ind-1].total_marks)) * 100

  console.log("all asnwers", this.answers)
  if(this.form.controls['test'].value == 'pre-test')
  {
    this.service.pretest(this.answers)
    .subscribe({
      next : (response)=> console.log(response)
    })
  }
  else if(this.form.controls['test'].value == 'post-test')
  {
    this.service.posttest(this.answers)
    .subscribe({
      next : (response)=> console.log(response)
    })
  }
}

load_answers(event:any, i:any,qslno :any, correct_answer:any)
{
  console.log(i , ':', event.target.value , ':', correct_answer)
  if(correct_answer == event.target.value)
    this.mark = this.mark + 1
  else if(correct_answer != event.target.value && this.answers[i]?.score == 1)
    this.mark = this.mark -1
  var temp_obj = {'slno' : qslno, 'result': event.target.value, 'score' :  correct_answer == event.target.value ? this.score[1]: this.score[0] }

  this.answers[i] = temp_obj
}
}
