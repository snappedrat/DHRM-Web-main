import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/home/api.service';

@Component({
  selector: 'app-test-evaluation',
  templateUrl: './test-evaluation.component.html',
  styleUrls: ['./test-evaluation.component.css']
})
export class TestEvaluationComponent implements OnInit {

  trainee:any
  modules :any
  form :any

  trainee_id :any = ''

  constructor(private service : ApiService, private fb : UntypedFormBuilder) {
    this.form = this.fb.group({
      trainee: ['',Validators.required],
      test : ['',Validators.required],
      module : ['',Validators.required],
      file :[''],
      score :[''],
      pf: [''],
      percent: [''],
      priorityval:['']

    })
   }


  ngOnInit(): void {

    this.service.getTrainee()
    .subscribe(
      {
        next: (response)=>{console.log('trainee : ', response) , this.trainee = response},
        error: (error)=> console.log(error)
      }
    )

    
    this.service.getOfflineModules()
    .subscribe(
      {
        next: (response)=>{console.log('trainee : ', response) , this.modules = response},
        error: (error)=> console.log(error)
      }
    )

  }

  offline_page()
  {
    if(this.form.controls['score'].value == '')
    {
      alert("please enter mark for the paper")
    }
    else
    {
      var i = this.form.controls['module'].value.split('.')[0]-1
      this.form.controls['pf'].setValue(this.modules[i].pass_criteria < this.form.controls['score'].value ? 'p' : 'f')
      this.form.controls['priorityval'].setValue(this.modules[i].priorityval)
      this.form.controls['percent'].setValue(((this.form.controls['score'].value) / (this.modules[i].total_marks)) * 100)
      console.log(this.form.value)
  
      this.service.offlineUpload(this.form.value)
      .subscribe({
        next: (res) =>{console.log(res)},
        error: (err) => console.log(err) 
      })
    }

  }

  store_trainee(event:any)
  {
    this.trainee_id = event.target.value.split('-')[1]
  }

  offline_upload(event:any)
  {
    if(this.form.invalid)
      alert('select the above requirements')
    else
    {
      var exten = event.target.files[0].name.split('.')
      exten = exten.pop()
      var formData = new FormData()
  
      formData.append("file", event.target.files[0], this.trainee_id+'_'+this.form.controls['module'].value+'_'+this.form.controls['test'].value+'.'+exten )
    
      this.service.questionbankupload(formData)
      .subscribe({
        next:(res) => {console.log(res)
        this.form.controls['file'].setValue(this.trainee_id+'_'+this.form.controls['module'].value+'_'+this.form.controls['test'].value+'.'+exten)},
        error:(err)=> {console.log(err)}
      })
    }


  }
}
