import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { leadingComment } from '@angular/compiler';

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css']
})
export class EducationEditComponent implements OnInit {

Exampassed: any = ['Yes', 'No']

eduData = [
  {
    'sno':'1',
    'school': '',
    'passed': '',
    'year': '',
    'department': '',
    'certificatenumber': '',
    'certificatedate': '',
    'percentage': ''
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

  constructor(private http: HttpClient, private cookie: CookieService, private plantcodeService: PlantcodeService ) { }

  ngOnInit(): void {
  }  
  submit(){
    console.log('family', this.eduData);
      if(this,this.eduData.length == 0){
      console.log("good");
      }
      else{
      this.plantcodeService.submitedu()
    }
}

sendData(){
  this.plantcodeService.fam = this.eduData
} 

//     this.http.
//     post('http://localhost:3000/lang', this.languageList)
//     .subscribe({
//       next: (response) => console.log(response),
//       error: (error) => console.log(error),
//   })
// }
}