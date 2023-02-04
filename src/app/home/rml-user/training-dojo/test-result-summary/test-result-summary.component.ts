import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ApiService } from 'src/app/home/api.service';

@Component({
  selector: 'app-test-result-summary',
  templateUrl: './test-result-summary.component.html',
  styleUrls: ['./test-result-summary.component.css']
})
export class TestResultSummaryComponent implements OnInit { 

d:any = this.getCurrentDate()

getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

date :any = {
  "start": '2020-01-01',
  "end": this.d,
  "plantcode": sessionStorage.getItem('plantcode') 
}

data: any

form:any

  constructor(private dateAdapter: DateAdapter<Date>, private service : ApiService) {
    this.dateAdapter.setLocale('en-GB');
   }

  ngOnInit(): void {
    this.service.testSummary(this.date).
    subscribe({
      next: (response)=>{console.log(response); this.data = response } 
    })
  }
  
  refresh(){
    window.location.reload();
  }
  save()
  {
    this.service.testSummary(this.date).
    subscribe({
      next: (response)=>{console.log(response); this.data = response } 
    })
  }

}
