import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { leadingComment } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css']
})
export class EducationEditComponent implements OnInit {

mobile: any
Exampassed: any = ['Yes', 'No']
education:any = []

mobile_no1 = {
  "mobile" : this.active.snapshot.paramMap.get('mobile_no1')
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
    'mobile': this.active.snapshot.paramMap.get('mobile_no1') 
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

  constructor(private http: HttpClient, private cookie: CookieService, private plantcodeService: PlantcodeService, private active : ActivatedRoute) { 
    // this.mobile = this.cookie.get('mobilenum')
    this.eduData[0].passed = 'Yes'

  }

  ngOnInit(): void {
    this.plantcodeService.getdataqualifn(this.mobile_no1)
    setTimeout(() => {
      this.education = this.plantcodeService.education

      // console.log('====================================');
      // console.log(this.education);
      // console.log('====================================');

      this.eduData[0].school = this.education[0]?.school_name1
      this.eduData[0].passed = this.education[0]?.exam_passed1
      this.eduData[0].year = this.education[0]?.passing_yr1
      this.eduData[0].department = this.education[0]?.subjects1
      this.eduData[0].certificatenumber = this.education[0]?.cert_number1
      this.eduData[0].certificatedate = this.education[0]?.cer_date1
      this.eduData[0].percentage = this.education[0]?.percentage1

      this.eduData[1].school = this.education[0]?.school_name2
      this.eduData[1].passed = this.education[0]?.exam_passed2
      this.eduData[1].year = this.education[0]?.passing_yr2
      this.eduData[1].department = this.education[0]?.subjects2
      this.eduData[1].certificatenumber = this.education[0]?.cert_number2
      this.eduData[1].certificatedate = this.education[0]?.cer_date2
      this.eduData[1].percentage = this.education[0]?.percentage2

      this.eduData[2].school = this.education[0]?.school_name3
      this.eduData[2].passed = this.education[0]?.exam_passed3
      this.eduData[2].year = this.education[0]?.passing_yr3
      this.eduData[2].department = this.education[0]?.subjects3
      this.eduData[2].certificatenumber = this.education[0]?.cert_number3
      this.eduData[2].certificatedate = this.education[0]?.cer_date3
      this.eduData[2].percentage = this.education[0]?.percentage3

      this.eduData[3].school = this.education[0]?.school_name4
      this.eduData[3].passed = this.education[0]?.exam_passed4
      this.eduData[3].year = this.education[0]?.passing_yr4
      this.eduData[3].department = this.education[0]?.subjects4
      this.eduData[3].certificatenumber = this.education[0]?.cert_number4
      this.eduData[3].certificatedate = this.education[0]?.cer_date4
      this.eduData[3].percentage = this.education[0]?.percentage4

    }, 1000);
    this.sendData()
  }  
  submit(){
    console.log('education', this.eduData);
      if(this,this.eduData.length == 0){
      console.log("good");
      }
      else{
      this.plantcodeService.submitedu()
    }
}

sendData(){
  this.plantcodeService.edu = this.eduData
} 

//     this.http.
//     post('http://localhost:3000/lang', this.languageList)
//     .subscribe({
//       next: (response) => console.log(response),
//       error: (error) => console.log(error),
//   })
// }
}
