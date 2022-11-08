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
  flag :any = true
  loading:any = false
  modules :any
  filename :any =[]
  url = 'http://localhost:3000/uploads/'
  
  sheight :any 
  height:any
  answer = new Set()
  questions: any = []
  child:any = {}

  username = {'username': sessionStorage.getItem('plantcode')}
  sno :any= -1

  constructor(private fb: UntypedFormBuilder, private service: ApiService, private active: ActivatedRoute, private router:Router) {


    this.form = fb.group({
      module: [''],
      username : [sessionStorage.getItem('user_name')],
      plantcode : [sessionStorage.getItem('plantcode')]
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


  submit()
  {
    this.flag = false
    this.questions[0] = this.form.value
  }


  scroll(e:any, i:any)
  {
    var a = e.target.scrollHeight
    var b = e.target.style.height
    console.log(a);
    
    console.log(b)
    this.sheight = a;
    this.height = b

  }

  style(i:any)
  {
      return this.sheight >= (this.height-2)? {'height':this.sheight + 'px'} :{'height': this.height+'px'}
  }

  addrow(i:any)
  {
    if(this.form.controls['module'].value == '')
    {
      alert('please select a module')
    }
    else
    {
      this.answer.add(i+1)
      if(this.questions[i+1]?.question == undefined)
        this.questions.push({})
    }

  }

  class(i:any)
  {
    return 'class' + (i+1)
  }

  question(event:any, i:any)
  {    
    
    this.questions[i+1].question = event.target.value
  }
  answers(event:any, i:any)
  {
    this.questions[i+1].answer = event.target.value
  }

  file(event:any, i:any)
  {
    var exten = event.target.files[0].name.split('.')
    exten = exten.pop()
    var formData = new FormData()

    formData.append("file", event.target.files[0], (i+1) + '_picture.'+exten )

    this.questions[i+1].file = (i+1) + '_picture.'+exten

    this.service.questionbankupload(formData)
    .subscribe({
      next:(res) => {console.log(res)
      this.filename[i] = this.url + this.questions[i+1].file},
      error:(err)=> {console.log(err)}
    })

  }

  show()
  {
    console.log(this.questions)
    console.log(this.form.value)

    this.service.questionbank(this.questions)
    .subscribe({
      next:(res) => {console.log(res);},
      error:(err)=>{console.log(err)}
    })

  } 
  }






