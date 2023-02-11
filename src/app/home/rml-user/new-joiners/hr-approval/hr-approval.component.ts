import { Component, OnInit } from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder, FormBuilder, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { DateRangeFilterPipe } from '../../dateFilter.pipe';

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
  url = environment.path
  from:Date = new Date('2023-01-01')
  to:Date = new Date('2023-10-01')
  colname:string =  'create_dt'
  
    constructor(private fb : UntypedFormBuilder, private http: HttpClient) {
      this.form = this.fb.group({
        status:new UntypedFormControl(' '),
        plantcode: [sessionStorage.getItem('plantcode')]
      });

     }

     call(event:any)
     {
      this.from = event.target.value
      console.log(this.from)
     }
     call2(event:any)
     {
      this.to = event.target.value
      console.log(this.to);
      
     }


    ngOnInit(): void {
      
      this.form.controls['status'].setValue('submitted')
      this.filter()
    } 

    doit(event:any){
      console.log(event)
    }
  
  filter()
  {
    console.log(this.form.value)
    this.http
    .post(this.url+'/filterforapproval', this.form.value)
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
