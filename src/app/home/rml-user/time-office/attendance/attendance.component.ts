import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatCalendar} from "@angular/material/datepicker";
import {Moment} from "moment";

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
  date:any 

  // myForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    // this.myForm = new FormGroup({
    //   type_leave: new FormControl('')
    // });
  }

  getChangedValue(event:any)
  {
    console.log(event)
  }

}


