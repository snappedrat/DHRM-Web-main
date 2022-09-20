import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-od',
  templateUrl: './od.component.html',
  styleUrls: ['./od.component.css']
})
export class OdComponent implements OnInit {

  // myForm: FormGroup;
  selectedDate: Date = new Date();
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
