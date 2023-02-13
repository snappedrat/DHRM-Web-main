import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/home/api.service';

@Component({
  selector: 'app-forget-punch',
  templateUrl: './forget-punch.component.html',
  styleUrls: ['./forget-punch.component.css']
})
export class ForgetPunchComponent implements OnInit {
    selectedDate: Date = new Date();
    bio_time_A:any
    bio_time_B:any
    form:any
    disable:any = 0
  disable1: number;
  disable2: number;
  canapply: number;

  constructor( private service: ApiService, private fb: UntypedFormBuilder ) {

    this.form = this.fb.group(
      {
        actual_in_time : ['', Validators.required],
        actual_out_time : ['', Validators.required],
        reason : ['', Validators.required],
        emp_id: [sessionStorage.getItem('user_name')],
        date:[],
        in_time:[],
        out_time:[]
      }
    )

   }

  ngOnInit(): void {

    this.getChangedValue(new Date())

  }

  getChangedValue(event:any)
  {
    
    this.form.reset()

    this.form.controls['emp_id'].setValue(sessionStorage.getItem('user_name'))

    console.log(new DatePipe('en-US').transform(event, 'yyyy-MM-dd'))
    var date = new DatePipe('en-US').transform(event, 'yyyy-MM-dd')
    this.form.controls['date'].setValue(date)
    var form = {id : sessionStorage.getItem('user_name'), date: date}

    this.service.forgotpunch_details(form)
    .subscribe({
      next: (response:any)=>
      {
        this.bio_time_A = response.in_time
        this.bio_time_B = response.out_time
        console.log(response)
        if(response.canApply == 0)
        {
          this.disable = 0;
          console.log(this.disable)
        }
        else
        {
          this.disable = ((this.bio_time_A == null) && (this.bio_time_B == null))? 1 : 0
        }

        this.disable1 =(this.bio_time_A == null) ? 1 : 0
        this.disable2 =(this.bio_time_B == null)? 1 : 0
      }
    })

  }

  submit()
  {
    console.log(this.form.value)

    this.form.controls['in_time'].setValue(this.form.controls['actual_in_time'].value)
    this.form.controls['out_time'].setValue(this.form.controls['actual_out_time'].value)
    this.form.controls['actual_in_time'].setValue(this.bio_time_A)
    this.form.controls['actual_out_time'].setValue(this.bio_time_B)

    console.log(this.form.value)
    
    this.service.forgot_punch(this.form.value)
    .subscribe(
      {
        next:(response:any)=>{console.log(response);
          alert(response.message)
        }
      }
    )
  }

  call(event:any)
  {
    console.log(event)
  }

  change_format(time:any)
  {
    // var hours = Number(time.split(':')[0])
    // var minutes = Number(time.split(':')[1].split(' ')[0])
    // var AMPM =time.split(' ')[1]
    // console.log(hours, minutes, AMPM)
    // if (AMPM == "PM" && hours < 12) 
    // hours = hours + 12;
    // if (AMPM == "AM" && hours == 12) 
    // hours = hours - 12;
    // var sHours = hours.toString();
    // var sMinutes = minutes.toString();
    // var finalTime = (sHours.length > 1 ? sHours : "0" + sHours) + ":" + (sMinutes.length > 1 ? sMinutes : "0" + sMinutes);
    // return finalTime
  }

}
