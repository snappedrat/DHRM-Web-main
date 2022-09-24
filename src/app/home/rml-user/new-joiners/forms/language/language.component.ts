import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

languageList = [
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

  constructor() { }

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
    
  }
}
