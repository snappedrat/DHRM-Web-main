import { Component, OnInit } from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PlantcodeService } from '../plantcode.service';
import { ifError } from 'assert';

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
  searchfilterinfo: any;

  constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service : PlantcodeService) {
    this.form = this.fb.group({
      status:new UntypedFormControl(' '),
      fromdate: new UntypedFormControl(' '),
      todate: new UntypedFormControl(' '),
      colname : new UntypedFormControl(' '),
      colvalue : new UntypedFormControl(' '),

      plantcode: [sessionStorage.getItem('plantcode')]

    });
   }
  ngOnInit(): void 
  {
    this.form.controls['status'].setValue('pending')
    this.form.controls['fromdate'].setValue('2015-01-01')
    var date = new Date()
    var to_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    this.form.controls['todate'].setValue(to_date)
    this.filter()
  }

filter()
{
  this.service.filter(this.form.value)
  .subscribe({
    next: (response) =>{ console.log(response); this.filterinfo = response},
    error: (error) => console.log(error),
  });

}

searchfilter()
{
  this.service.searchfilter(this.form.value)
  .subscribe({
    next: (response) =>{ console.log(response); this.searchfilterinfo= response; this.filterinfo = response},
    error: (error) => console.log(error),
  });

}

}
