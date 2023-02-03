import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-punch',
  templateUrl: './forget-punch.component.html',
  styleUrls: ['./forget-punch.component.css']
})
export class ForgetPunchComponent implements OnInit {
    selectedDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  getChangedValue(event:any)
  {
    console.log(new DatePipe('en-US').transform(event, 'yyyy-MM-dd'))
    var date = new DatePipe('en-US').transform(event, 'yyyy-MM-dd')
    var form = {emp_id : sessionStorage.getItem('user_name'), date: date}
  }

}
