import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { leadingComment } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Timestamp } from 'rxjs';



@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css'],
  animations: [
    trigger('slowAnimate', [
      transition(':enter', [style({opacity: '0'}), animate(500)]),
      transition(':leave', [style({opacity: '1'}), animate(500, style({opacity: '0'}))]),
    ])
  ]
})
export class EducationEditComponent implements OnInit {
  @Output() emit = new EventEmitter<any>()
  message = {'edu':false}
  message_bad = {'edu':true}

mobile: any
Exampassed: any = ['HSC','SSLC','BOARD','DIPLOMA','ITI','BE','BTECH','ARTS&SCIENCE']
education:any = []
flag: any = true


mobile_no1 = {
  "mobile" : this.active.snapshot.paramMap.get('mobile_no1'),
  'company':  this.active.snapshot.paramMap.get('company')

}

eduData = [
  {
    'sno':'1',
    'school': '',
    'passed': '',
    'year': '',
    'department': '',
    'certificatenumber': '',
    'certificatedate': '',
    'percentage': '',
    'mobile': this.active.snapshot.paramMap.get('mobile_no1'),
    'company':  this.active.snapshot.paramMap.get('company')

  },
  {
    'sno':'2',
    'school': '',
    'passed': '',
    'year': '',
    'department': '',
    'certificatenumber': '',
    'certificatedate': '',
    'percentage': ''
  },
  {
    'sno':'3',
    'school': '',
    'passed': '',
    'year': '',
    'department': '',
    'certificatenumber': '',
    'certificatedate': '',
    'percentage': ''
  },
  {
    'sno':'4',
    'school': '',
    'passed': '',
    'year': '',
    'department': '',
    'certificatenumber': '',
    'certificatedate': '',
    'percentage': ''
  },
];
  state: boolean;

  constructor(private http: HttpClient, private cookie: CookieService, private plantcodeService: PlantcodeService, private active : ActivatedRoute) { 
    // this.mobile = this.cookie.get('mobilenum')
    this.eduData[0].passed = 'Yes'

  }

  ngOnInit(): void {
    this.plantcodeService.getdataqualifn(this.mobile_no1)
    .subscribe({
      next: (response) => {console.log("qualifn",response); this.education = response;
      for(var i= 0; i<4 ;i++)
      {
        if(this.education[i]?.school_name == 'undefined')
           this.education[i].school_name = ''
        if(this.education[i]?.exam_passed == 'undefined')
           this.education[i].exam_passed = ''
        if(this.education[i]?.passing_yr == 'undefined')
           this.education[i].passing_yr = ''
        if(this.education[i]?.subjects == 'undefined')
           this.education[i].subjects = ''
        if(this.education[i]?.cert_number == 'undefined')
           this.education[i].cert_number = ''
        if(this.education[i]?.cert_date == 'undefined')
           this.education[i].cert_date = ''
        if(this.education[i]?.percentage == 'undefined')
           this.education[i].percentage = ''
        
        if(this.education[i]?.school_name != null)
          this.flag = false
        this.eduData[i].school = this.education[i]?.school_name
        this.eduData[i].passed = this.education[i]?.exam_passed
        this.eduData[i].year = this.education[i]?.passing_yr
        this.eduData[i].department = this.education[i]?.subjects
        this.eduData[i].certificatenumber = this.education[i]?.cert_number

        this.eduData[i].certificatedate = this.education[i]?.cert_date
        this.eduData[i].percentage = this.education[i]?.percentage

      }
      this.sendData()

      if((this.eduData[0].school != ''&&this.eduData[0].school != undefined) && (this.eduData[0].percentage != ''&& this.eduData[0].percentage != undefined) && (this.eduData[0].year != ''&& this.eduData[0].year != undefined) && (this.eduData[0].passed != ''&& this.eduData[0].passed != undefined) && (this.eduData[0].department != ''&&this.eduData[0].department !=undefined)  && (this.eduData[0].certificatenumber != ''&& this.eduData[0].certificatenumber != undefined)  && (this.eduData[0].certificatedate != ''&& this.eduData[0].certificatedate != undefined))
      {
        this.flag = false
        this.emit.emit(this.message)
      }
      this.sendData()} ,
      error: (error) => console.log(error),
    })
  }  
  submit(){
    this.sendData()
    if(this.eduData[0].school == '' || this.eduData[0].percentage == '' || this.eduData[0].year == '' || this.eduData[0].passed == '' || this.eduData[0].department == '' || this.eduData[0].certificatenumber == '' || this.eduData[0].certificatedate == '')
    {
        this.flag = true
    }
    else
    {
      console.log('education', this.eduData);

      console.log("good");

      this.plantcodeService.submitedu()
      this.state = true
      setTimeout(() => {
          this.state = false
      }, 2000);
    }

    }

sendData(){
  this.plantcodeService.edu = this.eduData
} 

public valid(){
  if((this.eduData[0].school != ''&&this.eduData[0].school != undefined) && (this.eduData[0].percentage != ''&& this.eduData[0].percentage != undefined) && (this.eduData[0].year != ''&& this.eduData[0].year != undefined) && (this.eduData[0].passed != ''&& this.eduData[0].passed != undefined) && (this.eduData[0].department != ''&&this.eduData[0].department !=undefined)  && (this.eduData[0].certificatenumber != ''&& this.eduData[0].certificatenumber != undefined)  && (this.eduData[0].certificatedate != ''&& this.eduData[0].certificatedate != undefined))
  {
    this.flag = false
    this.emit.emit(this.message)
  }
}

valids(event:any){
  console.log(this.eduData)
  if((this.eduData[0].school != ''&&this.eduData[0].school != undefined) && (this.eduData[0].percentage != ''&& this.eduData[0].percentage != undefined) && (this.eduData[0].year != ''&& this.eduData[0].year != undefined) && (this.eduData[0].passed != ''&& this.eduData[0].passed != undefined) && (this.eduData[0].department != ''&&this.eduData[0].department !=undefined)  && (this.eduData[0].certificatenumber != ''&& this.eduData[0].certificatenumber != undefined)  && (this.eduData[0].certificatedate != ''&& this.eduData[0].certificatedate != undefined))
  {
    console.log("good to go")
    this.flag = false
    this.emit.emit(this.message)
  }
  else
  {
    console.log(event.target.value.length)
    if(event.target.value.length == 0)
    {
      this.flag = true
      this.emit.emit(this.message_bad)

    }

    
  }
}
emitData()
{
  this.emit.emit(this.message)
}
}
