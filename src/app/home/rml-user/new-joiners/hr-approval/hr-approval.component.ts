import { Component, OnInit } from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-hr-approval',
  templateUrl: './hr-approval.component.html',
  styleUrls: ['./hr-approval.component.css']
})
export class HrApprovalComponent implements OnInit {


  form: any
  filterinfo: any
    constructor(private fb : UntypedFormBuilder, private http: HttpClient) {
      this.form = this.fb.group({
        status:new UntypedFormControl(' '),
        fromdate: new UntypedFormControl(' '),
        todate: new UntypedFormControl(' '),
  
      });
     }
    ngOnInit(): void {
    }
  
  filter()
  {
    console.log(this.form.value)
    this.http
    .post('http://localhost:3000/filter', this.form.value)
    .subscribe({
      next: (response) =>{ console.log(response); this.filterinfo = response},
      error: (error) => console.log(error),
    });
  }
  
    traineeinfo : any[] = [
  {
    date: "1001",
    fullname: "hi",
    fathername: "hello",
    dob: "1001",
    mobile  : "9876543217",
    aadhar: "444666333342",
    apln: "appointed"
  }
    ]
  



}
