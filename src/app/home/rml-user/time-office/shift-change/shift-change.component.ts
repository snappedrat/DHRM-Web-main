import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-shift-change',
  templateUrl: './shift-change.component.html',
  styleUrls: ['./shift-change.component.css']
})
export class ShiftChangeComponent implements OnInit {

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
