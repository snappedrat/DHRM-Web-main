import { Component, OnInit } from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PlantcodeService } from '../plantcode.service';

@Component({
  selector: 'app-trainee-application-status',
  templateUrl: './trainee-application-status.component.html',
  styleUrls: ['./trainee-application-status.component.css']
})
export class TraineeApplicationStatusComponent implements OnInit {

form: any
filterinfo: any
colname :any
colvalue :any

  constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service : PlantcodeService) {
    this.form = this.fb.group({
      status:new UntypedFormControl(' '),
      fromdate: new UntypedFormControl(' '),
      todate: new UntypedFormControl(' '),
      plantcode: [localStorage.getItem('plantcode')]

    });
   }
  ngOnInit(): void {
    this.form.controls['status'].setValue('pending')
    this.form.controls['fromdate'].setValue('2015-01-01')
    var date = new Date()
    var to_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    this.form.controls['todate'].setValue(to_date)
      this.filter()


  }

  dummy(){
    console.log(this.colname, this.colvalue)


  }

// filter()
// {
//   console.log(this.form.value)
//   this.http
//   .post('http://localhost:3000/filter', this.form.value)
//   .subscribe({
//     next: (response) =>{ console.log(response); this.filterinfo = response},
//     error: (error) => console.log(error),
//   });
// }


filter()
{
  this.service.filter(this.form.value)
  this.filterinfo = this.service.filterinfo
  console.log(this.filterinfo)
}

}
