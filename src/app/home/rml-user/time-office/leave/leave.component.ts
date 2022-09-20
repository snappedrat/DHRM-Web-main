import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";


export interface department_roster{
  leave_type:string,
  total:number,
  availed:number,
  balance:number
}
const DUMMY_DATA: department_roster[] = [
  {leave_type:"CL",total:10,availed:2,balance:8},
  {leave_type:"PL",total:8,availed:4,balance:4},
];

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  displayedColumns: string[] = ['leave_type','total','availed','balance'];
  dataSource = DUMMY_DATA;
  // myForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    // this.myForm = new FormGroup({
    //   type_leave: new FormControl('')
    // });
  }

  // onSubmit(form: FormGroup) {
  //   console.log(form.value.type_leave);
  // }

}
