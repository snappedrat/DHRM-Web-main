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
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css']
})
export class QuestionBankComponent implements OnInit {

  form:FormGroup =new FormGroup({})
  formtest:FormGroup =new FormGroup({})

  loading:any = false
  modules :any
  
  height :any
  answer = new Set()
  questions: any = []
  child:any = {}

  username = {'username': sessionStorage.getItem('plantcode')}
  sno :any= -1

  constructor(private fb: UntypedFormBuilder, private service: ApiService, private active: ActivatedRoute, private router:Router) {


    this.form = fb.group({
      module: [''],
      username: [this.active.snapshot.paramMap.get('username')]
    })
   }

  ngOnInit(): void {
  this.answer.add(0)

    this.service.getModules(this.username)
    .subscribe({
      next: (response)=>{console.log(response); this.modules = response},
      error: (error)=>console.log(error)
    })
  }


  submit(){
    console.log("values : ",this.form.value);
  }

  scroll(e:any, i:any)
  {
    var a = e.target.scrollHeight
    this.height = a;
  }

  style(i:any)
  {
      return this.height >= 44? {'height':this.height + 'px'} :{'height': '44px'}

  }

  addrow(i:any)
  {
    this.answer.add(i+1)
  }

  class(i:any)
  {
    return 'class' + (i+1)
  }
  question(event:any, i:any)
  {
    this.questions.push({})
    this.child.sno = i
    this.child.question = event.target.value
    console.log(this.questions.filter((e:any) => e.sno == i))
    if(this.questions.filter((e:any) => e.sno == i))
    {
      // this.questions[i].question = event.target.value
    }
    else if(this.questions.filter((e:any) => e.sno != i))
      this.questions.push(this.child)

  }
  answers(event:any, i:any)
  {
    this.child.answers = event.target.value
  }
  file(event:any, i:any)
  {
    this.child.files = event.target.value
    this.questions.push(this.child)

  }
  show()
  {
    this.questions.push(this.child)
    console.log(this.questions)
  } 
  }






