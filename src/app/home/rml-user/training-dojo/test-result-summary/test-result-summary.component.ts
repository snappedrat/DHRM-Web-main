import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-test-result-summary',
  templateUrl: './test-result-summary.component.html',
  styleUrls: ['./test-result-summary.component.css']
})
export class TestResultSummaryComponent implements OnInit { 

data :any = {
  "start": '',
  "end": ''
}

dummy :any = [
  {
    '1':1,
    '2':2,
    '3':3,
    '4':4,
    '5':5,
    '6':6,
    '7':7,
    '8':8
  },
  {

    '1':1,
    '2':2,
    '3':3,
    '4':4,
    '5':5,
    '6':6,
    '7':7,
    '8':8
  },
  {

    '1':1,
    '2':2,
    '3':3,
    '4':4,
    '5':5,
    '6':6,
    '7':7,
    '8':8
  }
]

form:any

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
   }

  ngOnInit(): void {
  }
  refresh(){
    window.location.reload();
  }
  save()
  {
    console.log(this.data)
  }
}
