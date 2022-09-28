import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { leadingComment } from '@angular/compiler';

@Component({
  selector: 'app-prev-edit',
  templateUrl: './prev-edit.component.html',
  styleUrls: ['./prev-edit.component.css']
})
export class PrevEditComponent implements OnInit {
 
  
  prevData = [
    {
      'sno':'1',
      'name': '',
      'desig': '',
      'periodf': '',
      'periodt': '',
      'sal': '',
      'reason': ''
    },
    {
      'sno':'2',
      'name': '',
      'desig': '',
      'periodf': '',
      'periodt': '',
      'sal': '',
      'reason': ''
    },
    {
      'sno':'3',
      'name': '',
      'desig': '',
      'periodf': '',
      'periodt': '',
      'sal': '',
      'reason': ''
    },
    {
      'sno':'4',
      'name': '',
      'desig': '',
      'periodf': '',
      'periodt': '',
      'sal': '',
      'reason': ''
    }

  ];
  
    constructor(private http: HttpClient, private cookie: CookieService, private plantcodeService: PlantcodeService ) { }
  
    ngOnInit(): void {
    }  
    submit(){
      console.log('family', this.prevData);
        if(this,this.prevData.length == 0){
        console.log("good");
        }
        else{
        this.plantcodeService.submitprev()
      }
  }
  
  sendData(){
    this.plantcodeService.fam = this.prevData
  } 
  
  //     this.http.
  //     post('http://localhost:3000/lang', this.languageList)
  //     .subscribe({
  //       next: (response) => console.log(response),
  //       error: (error) => console.log(error),
  //   })
  // }
  }
  