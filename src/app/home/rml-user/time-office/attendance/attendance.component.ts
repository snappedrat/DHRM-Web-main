import { DatePipe } from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatCalendar} from "@angular/material/datepicker";
import { ActivatedRoute } from '@angular/router';
import {Moment} from "moment";
import { ApiService } from 'src/app/home/api.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('calendar') calendar: MatCalendar<Moment>;
  selectedDate: Date = new Date();

  in_time:any 
  out_time:any
  total_hrs:string;
  shift:string 
  present_type:any
  class:any 

  // myForm: FormGroup;

  constructor(private active: ActivatedRoute, private service: ApiService) {
  }

  ngOnInit(): void {
    this.getChangedValue(new Date())

  }

  getChangedValue(event:any)
  {
    console.log(new DatePipe('en-US').transform(event, 'yyyy-MM-dd'))
    var date = new DatePipe('en-US').transform(event, 'yyyy-MM-dd')
    var form = {emp_id : sessionStorage.getItem('user_name'), date: date}

    this.service.attendance(form)
    .subscribe({
      next: (response:any)=>
      {
      console.log(response);
      this.in_time = response.In_Time
      this.out_time = response.Out_Time
      this.total_hrs = response.Total_Hours == null ? response.Total_Hours : response.Total_Hours + ' Hours'
      this.shift = response.Shift
      this.present_type = response.present_type
      this.class = this.present_type == 'Absent' ? 1 : 0

      if(this.present_type == 'false')
        this.present_type = 'Unknown'

      },
      error: (err)=>{console.log(err)
      }
    })
  }

}


