import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, UntypedFormGroup, UntypedFormBuilder, UntypedFormControl} from '@angular/forms';

@Component({
  selector: 'app-trainee-test',
  templateUrl: './trainee-test.component.html',
  styleUrls: ['./trainee-test.component.css']
})
export class TraineeTestComponent implements OnInit {

  form:FormGroup =new FormGroup({})
  formtest:FormGroup =new FormGroup({})

  modules :any = ['module1', 'module2' , 'module3']
  test:any = ['pre-test', 'post-test']
  qualified:any = 'you are qualified'

  choices = ['A','B','C','D']

  constructor(private fb: UntypedFormBuilder) {
    this.form = fb.group({
      modules: [''],
      test:['']
    })
    this.formtest = fb.group({
      answers: [''],
    })
   }

  ngOnInit(): void {
  }

submit()
{
  console.log(this.formtest.value)
}

}
