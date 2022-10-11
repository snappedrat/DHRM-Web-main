import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { leadingComment } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  

uniqueId :any = {'mobile':''}
details : any = []

languageList = [
  {
    'language': 'TAMIL',
    'speak': 0,
    'read': 0,
    'write': 0,
    'mothertongue': 0,
    'understand': 0,
    'mobile': this.active.snapshot.paramMap.get('mobile_no1')
  },
  {
    'language': 'ENGLISH',
    'speak': 0,
    'read': 0,
    'write': 0,
    'mothertongue': 0,
    'understand': 0
  },
  {
    'language': 'HINDI',
    'speak': 0,
    'read': 0,
    'write': 0,
    'mothertongue': 0,
    'understand': 0
  },
  {
    'language':'MALAYALAM',
    'speak': 0,
    'read': 0,
    'write': 0,
    'mothertongue': 0,
    'understand': 0
  },
  {
  'language': 'KANNADA',
    'speak': 0,
    'read': 0,
    'write': 0,
    'mothertongue': 0,
    'understand': 0
  },
  {
    'language': 'TELUGU',
    'speak': 0,
    'read': 0,
    'write': 0,
    'mothertongue': 0,
    'understand': 0
  }
];

  constructor(private http: HttpClient, private cookie: CookieService, private plantcodeService: PlantcodeService , private active : ActivatedRoute) { }

  ngOnInit(): void {

    this.getdatabasic()

    setTimeout(() => {

    this.languageList[0].language = this.details[0]?.lang1_name
    this.languageList[0].speak = this.details[0]?.lang1_speak
    this.languageList[0].read = this.details[0]?.lang1_read
    this.languageList[0].write = this.details[0]?.lang1_write
    this.languageList[0].mothertongue = this.details[0]?.lang1_mothertounge
    this.languageList[0].understand = this.details[0]?.lang1_understand

    this.languageList[1].language = this.details[0]?.lang2_name
    this.languageList[1].speak = this.details[0]?.lang2_speak
    this.languageList[1].read = this.details[0]?.lang2_read
    this.languageList[1].write = this.details[0]?.lang2_write
    this.languageList[1].mothertongue = this.details[0]?.lang2_mothertounge
    this.languageList[1].understand = this.details[0]?.lang2_understand

    this.languageList[2].language = this.details[0]?.lang3_name
    this.languageList[2].speak = this.details[0]?.lang3_speak
    this.languageList[2].read = this.details[0]?.lang3_read
    this.languageList[2].write = this.details[0]?.lang3_write
    this.languageList[2].mothertongue = this.details[0]?.lang3_mothertounge
    this.languageList[2].understand = this.details[0]?.lang3_understand

    this.languageList[3].language = this.details[0]?.lang4_name
    this.languageList[3].speak = this.details[0]?.lang4_speak
    this.languageList[3].read = this.details[0]?.lang4_read
    this.languageList[3].write = this.details[0]?.lang4_write
    this.languageList[3].mothertongue = this.details[0]?.lang4_mothertounge
    this.languageList[3].understand = this.details[0]?.lang4_understand

    this.languageList[4].language = this.details[0]?.lang5_name
    this.languageList[4].speak = this.details[0]?.lang5_speak
    this.languageList[4].read = this.details[0]?.lang5_read
    this.languageList[4].write = this.details[0]?.lang5_write
    this.languageList[4].mothertongue = this.details[0]?.lang5_mothertounge
    this.languageList[4].understand = this.details[0]?.lang5_understand

    this.languageList[5].language = this.details[0]?.lang6_name
    this.languageList[5].speak = this.details[0]?.lang6_speak
    this.languageList[5].read = this.details[0]?.lang6_read
    this.languageList[5].write = this.details[0]?.lang6_write
    this.languageList[5].mothertongue = this.details[0]?.lang6_mothertounge
    this.languageList[5].understand = this.details[0]?.lang6_understand

      for(var i = 0;i<=5;i++)
      {
        if(this.languageList[5].speak == null)
          this.languageList[i].speak = 0
        if(this.languageList[5].read == null)
          this.languageList[i].read = 0
        if(this.languageList[5].write == null)
          this.languageList[i].write = 0
        if(this.languageList[5].mothertongue == null)
          this.languageList[i].mothertongue = 0
          if(this.languageList[5].understand == null)
          this.languageList[i].understand = 0
      
      }

      this.sendData()
      console.log(this.details[0]?.lang1_name)
    }, 1000);

  }
  changestatus(event: any, data: any,item: any){

    console.log('test', event.target.checked);
    
    if(event.target.checked == true)
    {
      if(item == 'speak'){
        data.speak=1;
      }
      else if(item=='read')
      {
        data.read=1;
      }
      else if(item=='write')
      {
        data.write=1;
      }
      else if(item=='mothertongue')
      {
        data.mothertongue=1;
      }
      else if(item=='understand')
      {
        data.understand=1;
      }
     }else{
      if(item == 'speak'){
        data.speak = 0;
      }
     else if(item=='read')
      {
        data.read=0;
      }
      else if(item=='write')
      {
        data.write=0;
      }
      else if(item=='mothertongue')
      {
        data.mothertongue=0;
      }
      else if(item=='understand')
      {
        data.understand=0;
      }

     }
  }  
  submit(){
    console.log('language', this.languageList);
      if(this,this.languageList.length == 0){
      console.log("good");
      }
      else{
      this.plantcodeService.sumbitlang()
    }
}

sendData(){
  this.plantcodeService.lang = this.languageList
} 

getdatabasic(){
  this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');

  this.http.
post('http://localhost:3000/getdatabasic',this.uniqueId)
.subscribe({
  next: (response) => {console.log("lang : ",response); this.details = response} ,
  error: (error) => console.log(error),
})
}


}
