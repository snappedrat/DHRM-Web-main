import { Component, OnInit } from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder, FormBuilder, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-hr-approval',
  templateUrl: './hr-approval.component.html',
  styleUrls: ['./hr-approval.component.css']
})
export class HrApprovalComponent implements OnInit {

  var: any = 0
  form: any
  filterinfo: any
  uniqueId :any = {'mobile':''}
    constructor(private fb : UntypedFormBuilder, private http: HttpClient) {
      this.form = this.fb.group({
        status:new UntypedFormControl(' '),
      });

     }


    ngOnInit(): void {
      
    }

    doit(event:any){
      console.log(event)
    }
  
  filter()
  {
    console.log(this.form.value)
    this.http
    .post('http://localhost:3000/filterforapproval', this.form.value)
    .subscribe({
      next: (response) =>{ console.log(response); this.filterinfo = response},
      error: (error) => console.log(error),
    });
  }

  approved(data:any)
  {
      this.uniqueId.mobile = data

      console.log(this.uniqueId);

      this.http
      .post('http://localhost:3000/approved', this.uniqueId)
      .subscribe({
        next: (response) =>{ console.log(response);},
        error: (error) => console.log(error),
      })
  }

  rejected(data:any)
  {
    this.uniqueId.mobile = data

    console.log(this.uniqueId);

    this.http
    .post('http://localhost:3000/rejected', this.uniqueId)
    .subscribe({
      next: (response) =>{ console.log(response);},
      error: (error) => console.log(error),
    })
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
