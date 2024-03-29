import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormService } from '../../form.service';
import { leadingComment } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { threadId } from 'worker_threads';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
  animations: [
    trigger('slowAnimate', [
      transition(':enter', [style({opacity: '0'}), animate(500)]),
      transition(':leave', [style({opacity: '1'}), animate(500, style({opacity: '0'}))]),
    ])
  ]
})
export class LanguageComponent implements OnInit {

@Input() details : any = []

uniqueId :any = {'mobile':''}
flag: any = true

languageList = [
  {
    'language': 'TAMIL',
    'speak': 0,
    'read': 0,
    'write': 0,
    'mothertongue': 0,
    'understand': 0,
    'mobile': this.active.snapshot.paramMap.get('mobile_no1'),
    'company':  this.active.snapshot.paramMap.get('company')

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
  state: boolean;
  disabled: boolean = true;

  constructor(private http: HttpClient, private cookie: CookieService, private formservice: FormService , private active : ActivatedRoute) { }

  ngOnInit(): void {

    this.getdatabasic()
    this.sendData()

  }

  getdatabasic(){
    this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');
    this.uniqueId.company = this.active.snapshot.paramMap.get('company');

    this.languageList[0].speak = this.details[0]?.lang1_speak
    this.languageList[0].read = this.details[0]?.lang1_read
    this.languageList[0].write = this.details[0]?.lang1_write
    this.languageList[0].mothertongue = this.details[0]?.lang1_mothertounge
    this.languageList[0].understand = this.details[0]?.lang1_understand
  
    this.languageList[1].speak = this.details[0]?.lang2_speak
    this.languageList[1].read = this.details[0]?.lang2_read
    this.languageList[1].write = this.details[0]?.lang2_write
    this.languageList[1].mothertongue = this.details[0]?.lang2_mothertounge
    this.languageList[1].understand = this.details[0]?.lang2_understand
  
    this.languageList[2].speak = this.details[0]?.lang3_speak
    this.languageList[2].read = this.details[0]?.lang3_read
    this.languageList[2].write = this.details[0]?.lang3_write
    this.languageList[2].mothertongue = this.details[0]?.lang3_mothertounge
    this.languageList[2].understand = this.details[0]?.lang3_understand
  
    this.languageList[3].speak = this.details[0]?.lang4_speak
    this.languageList[3].read = this.details[0]?.lang4_read
    this.languageList[3].write = this.details[0]?.lang4_write
    this.languageList[3].mothertongue = this.details[0]?.lang4_mothertounge
    this.languageList[3].understand = this.details[0]?.lang4_understand
  
    this.languageList[4].speak = this.details[0]?.lang5_speak
    this.languageList[4].read = this.details[0]?.lang5_read
    this.languageList[4].write = this.details[0]?.lang5_write
    this.languageList[4].mothertongue = this.details[0]?.lang5_mothertounge
    this.languageList[4].understand = this.details[0]?.lang5_understand
  
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

      for(var i=0; i<this.languageList.length; i++)
      {
        if(this.languageList[i].speak == 1)
        {
          this.disabled = false
          break
        }
      }
  
      this.sendData()
  }
  

  changestatus(event: any, data: any,item: any){

    console.log('test', event.target.checked);
    
    if(event.target.checked == true)
    {
      if(item == 'speak'){
        data.speak=1;
        this.disabled = false
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
        if(data.mothertongue == 1)
          for(var i = 0 ; i<=5; i++)
            this.languageList[i].mothertongue = 0
        data.mothertongue = 1
      }
      else if(item=='understand')
      {
        data.understand=1;
      }
     }
     else
     {
      if(item == 'speak'){
        if(data.speak == 1)
        {
          for(var i=0; i<=5; i++)
          {
            if(this.languageList[i].speak == 1)
            {
              this.disabled = false
              break;
            }
            else
            this.disabled = true
          }
        }
        data.speak = 0;

          for(var i=0; i<=5; i++)
          {
            if(this.languageList[i].speak == 1)
            {
              this.disabled = false
              break;
            }
            else
            this.disabled = true
          }
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
      if(this.languageList.length == 0){
      console.log("good");
      }
      else{
      this.formservice.sumbitlang()
      this.state = true
      setTimeout(() => {
          this.state = false
      }, 2000);
    }
}

sendData(){
  this.formservice.lang = this.languageList
} 


// public valid(){
//   if(this.languageList[0].language != '' && this.languageList[0].write != '' && this.languageList[0].read != '' && this.languageList[0].speak != '' && this.languageList[0].understand != '')
//     this.flag = false
// }

// valids(event :any){
//   if(this.languageList[0].language != '' && this.languageList[0].write != '' && this.languageList[0].read != '' && this.languageList[0].speak != '' && this.languageList[0].understand != '')
//   {
//     console.log("good to go")
//     this.flag = false
//   }
//   else
//   {
//     console.log(event.target.value.length)
//     if(event.target.value.length == 0)
//       this.flag = true

//   }
// }


}
