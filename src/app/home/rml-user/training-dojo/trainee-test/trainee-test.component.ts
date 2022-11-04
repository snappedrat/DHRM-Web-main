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

@Component({
  selector: 'app-trainee-test',
  templateUrl: './trainee-test.component.html',
  styleUrls: ['./trainee-test.component.css']
})
export class TraineeTestComponent implements OnInit {

  form:FormGroup =new FormGroup({})
  formtest:FormGroup =new FormGroup({})

  loading:any = false
  modules :any
  questions:any
  answers:any = {}
  marks:any = 0
  test:any = ['pre-test', 'post-test']
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

  this.service.Qualified(this.form.value)
  .subscribe({
    next: (response:any)=>{console.log(response)

      if(response.message == 'passed' || response.message == 'failed')
      {
        this.qualified = 'you have already written the exam'
        this.getQuestions(false)
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
    error : (error) =>{console.log(error)}
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
  console.log(this.marks)
  console.log("all asnwers", this.answers)
}

load_answers(event:any, i:any, correct_answer:any)
{
  console.log(i+1 , ':', event.target.value , ':', correct_answer)

  this.answers[i] = event.target.value

  if(event.target.value == correct_answer)
  {
    this.marks = this.marks+1
  }
}
}
