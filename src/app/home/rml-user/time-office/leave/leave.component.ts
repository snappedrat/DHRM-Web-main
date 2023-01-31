import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

  

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  
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
