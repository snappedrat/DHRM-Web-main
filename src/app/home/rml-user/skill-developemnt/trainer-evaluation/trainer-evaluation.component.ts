import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-trainer-evaluation',
  templateUrl: './trainer-evaluation.component.html',
  styleUrls: ['./trainer-evaluation.component.css']
})
export class TrainerEvaluationComponent implements OnInit {


  filterinfo:any = []

  form:any

  constructor(private fb : UntypedFormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      status: [''],
      plantcode: [sessionStorage.getItem('plantcode')]
    });

   }


  ngOnInit(): void {
  }

  filter()
  {
    
  }

}
