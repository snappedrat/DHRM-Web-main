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

  in_time:string = "10:00AM";
  out_time:string = "5:00PM";
  total_hrs:string = "7 Hours";
  shift:string = "1 (10:00AM - 5:00PM)";

  // myForm: FormGroup;

  constructor(private active: ActivatedRoute, private service: ApiService) {
  }

  ngOnInit(): void {
    // this.myForm = new FormGroup({
    //   type_leave: new FormControl('')
    // });
  }

  getChangedValue(event:any)
  {
    console.log(new DatePipe('en-US').transform(event, 'yyyy-MM-dd'))
    var date = new DatePipe('en-US').transform(event, 'yyyy-MM-dd')
    var form = {emp_id : sessionStorage.getItem('gen_id'), date: date}

    this.service.attendance(form)
    .subscribe({
      next: (response:any)=>{console.log(response)},
      error: (err)=>{console.log(err)}
    })
  }

}


