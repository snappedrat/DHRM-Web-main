import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-annual-planning',
  templateUrl: './annual-planning.component.html',
  styleUrls: ['./annual-planning.component.css']
})
export class AnnualPlanningComponent implements OnInit {

  questions: any = [{}]
  inserted:any = 1
  form:any

  constructor(private fb : UntypedFormBuilder)
  {
    this.form = this.fb.group
    (
      {
        department:[],
        line: [],
        shift1:[],
        shift2:[],
        shift3:[]
      }
    )

  }

  ngOnInit(): void {
    
  }

  addrow(i:any)
  {
        if(i == this.questions.length-1)
        {
          this.questions.push({})
          this.inserted += 1;
        }
  }

  dept(event:any, i:any)
  {    
    this.questions[i].dept = event.target.value
    console.log(this.questions[i])
  }
  line(event:any, i:any)
  {    
    this.questions[i].line = event.target.value
    console.log(this.questions[i])
  }
  shift1(event:any, i:any)
  {    
    this.questions[i].shift1 = event.target.value
    console.log(this.questions[i])
  }
  shift2(event:any, i:any)
  {    
    this.questions[i].shift2 = event.target.value
    console.log(this.questions[i])
  }
  shift3(event:any, i:any)
  {    
    this.questions[i].shift3 = event.target.value
    console.log(this.questions[i])
  }
  save()
  {
    console.log(this.questions)
  }

}
