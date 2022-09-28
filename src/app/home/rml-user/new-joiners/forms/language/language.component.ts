import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { leadingComment } from '@angular/compiler';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

lang: any = ['tamil', 'english', 'marati', 'telugu', 'malayalam', 'hindi']

languageList = [
  {
    'language': '',
    'speak': 1,
    'read': 1,
    'write': 1,
    'mothertongue': 1,
    'understand': 1
  },
  {
    'language': '',
    'speak': 0,
    'read': 0,
    'write': 0,
    'mothertongue': 0,
    'understand': 0
  },
  {
    'language': '',
    'speak': 0,
    'read': 0,
    'write': 0,
    'mothertongue': 0,
    'understand': 0
  },
  {
    'language': '',
    'speak': 0,
    'read': 0,
    'write': 0,
    'mothertongue': 0,
    'understand': 0
  },
  {
  'language': '',
    'speak': 0,
    'read': 0,
    'write': 0,
    'mothertongue': 0,
    'understand': 0
  },
  {
    'language': '',
    'speak': 0,
    'read': 0,
    'write': 0,
    'mothertongue': 0,
    'understand': 0
  }
];

  constructor(private http: HttpClient, private cookie: CookieService, private plantcodeService: PlantcodeService ) { }

  ngOnInit(): void {
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

//     this.http.
//     post('http://localhost:3000/lang', this.languageList)
//     .subscribe({
//       next: (response) => console.log(response),
//       error: (error) => console.log(error),
//   })
// }
}
