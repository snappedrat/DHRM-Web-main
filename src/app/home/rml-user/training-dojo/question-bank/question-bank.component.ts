import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, UntypedFormGroup, UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { LoaderserviceService } from 'src/app/loaderservice.service';

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
  url = environment.path +'/qbank/'
  
  
  sheight :any 
  height:any
  // answer:any = ['']
  questions: any = [{}]
  inserted:any = 1

  username = {'username': sessionStorage.getItem('plantcode')}
  sno :any= -1
  offline_flag: boolean = true;
  qsize: any;

  constructor(private fb: UntypedFormBuilder, private service: ApiService, private active: ActivatedRoute, private router:Router,public loader:LoaderserviceService) {


    this.form = fb.group({
      module: [''],
      username : [sessionStorage.getItem('user_name')],
      plantcode : [sessionStorage.getItem('plantcode')]
    })
   }

  ngOnInit(): void {
    this.service.getModules(this.username)
    .subscribe({
      next: (response)=>{console.log(response); this.modules = response},
      error: (error)=>console.log(error)
    })
  }


  getquestions(event:any)
  {
    this.flag = false
    var i = event.target.value.split('.')[0]-1
    if(this.modules[i].category == 'OFFLINE')
    {
      this.offline_flag = false
    }
    else
    {
      this.offline_flag = true
    }
    console.log(event.target.value.split('.')[1])
    this.service.getQuestions_tnr({module: event.target.value.split('.')[1], plant_code: sessionStorage.getItem('plantcode')})
    .subscribe(
      {
        next: (response:any)=>{console.log(response); this.questions = response; this.qsize = this.questions.length; this.questions.push({})}
      }
    )

  }

  addrow(i:any)
  {
    if(this.form.controls['module'].value == '')
    {
      alert('please select a module')
    }
    else
    {
        if(i == this.questions.length-1)
        {
          this.questions.push({})
          this.inserted += 1;
          console.log(this.inserted)
        }
    }
  }

  question(event:any, i:any)
  {    

    this.questions[i].question = event.target.value
    console.log(this.questions[i])
  }
  answers(event:any, i:any)
  {
    console.log(event.target.value)
    this.questions[i].correct_answer = event.target.value.toUpperCase()
    console.log(this.questions)  
  }

  file(event:any, i:any)
  {
    var exten = event.target.files[0].name.split('.')
    exten = exten.pop()
    var formData = new FormData()

    formData.append("file", event.target.files[0], this.form.controls['module'].value+'_'+(i+1)+ '_picture.'+exten )

    this.questions[i].image_filename = this.form.controls['module'].value+'_'+(i+1)+ '_picture.'+exten

    this.service.questionbankupload(formData)
    .subscribe({
      next:(res) => {console.log(res)},
      error:(err)=> {console.log(err)}
    })

  }

  submit()
  {
    console.log(this.questions)
    console.log(this.form.value)

    this.questions[this.questions.length-1] = 
    {
      module: this.form.controls['module'].value,
      plantcode: sessionStorage.getItem('plantcode'),
      inserted: this.inserted
     }

    this.service.questionbank(this.questions)
    .subscribe({
      next:(res:any) => 
      {
        console.log(res);
        if(res.message =='success')
        {
          alert("The questions have been updated.")
          location.reload()
        }
      },
      error:(err)=>{console.log(err)}
    })

  } 
  delete(i:any)
  {
    console.log(this.questions[i].question)
    if(this.questions.length != 1 && this.questions.length != i+1)
    {
        this.service.questionBankDelete({qslno: this.questions[i].qslno})
        .subscribe(
          {
            next: (res:any)=>{ console.log("qdel", res);
            if(i+1 >=this.qsize)
            {
              this.inserted-=1;
              console.log(this.inserted, this.qsize)
            } }
          }
        )
      this.questions.splice(i,1)

    }
    console.log(this.questions)
  }
  }






