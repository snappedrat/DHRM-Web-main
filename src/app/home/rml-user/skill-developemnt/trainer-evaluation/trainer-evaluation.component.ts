import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ApiService } from 'src/app/home/api.service';

@Component({
  selector: 'app-trainer-evaluation',
  templateUrl: './trainer-evaluation.component.html',
  styleUrls: ['./trainer-evaluation.component.css']
})
export class TrainerEvaluationComponent implements OnInit {


  filterinfo:any = []

  form:any

  constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService) {
    this.form = this.fb.group({
      status: ['0-90'],
      plantcode: [sessionStorage.getItem('plantcode')]
    });

   }


  ngOnInit(): void {
    this.service.evaluationdays(this.form.value)
    .subscribe(
      {
        next: (response)=>{console.log(response); this.filterinfo = response}
      }
    )
  }

  filter()
  {
    this.service.evaluationdays(this.form.value)
    .subscribe(
      {
        next: (response)=>{console.log(response); this.filterinfo = response}
      }
    ) 
  }

}
