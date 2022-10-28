import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { leadingComment } from '@angular/compiler';
import { send } from 'process';
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
  selector: 'app-prev-edit',
  templateUrl: './prev-edit.component.html',
  styleUrls: ['./prev-edit.component.css'],
  animations: [
    trigger('slowAnimate', [
      transition(':enter', [style({opacity: '0'}), animate(500)]),
      transition(':leave', [style({opacity: '1'}), animate(500, style({opacity: '0'}))]),
    ])
  ]
})
export class PrevEditComponent implements OnInit {
 
  mobile_no1 = {
    "mobile" : this.active.snapshot.paramMap.get('mobile_no1')
  }

  career:any = []

  prevData = [
    {
      'sno':'1',
      'name': '',
      'desig': '',
      'periodf': '',
      'periodt': '',
      'sal': '',
      'reason': '',
      'mobile': this.active.snapshot.paramMap.get('mobile_no1')
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
  flag: any = true;
  state: boolean;
  
    constructor(private http: HttpClient, private cookie: CookieService, private plantcodeService: PlantcodeService, private active: ActivatedRoute ) { }
  
    ngOnInit(): void {
      
      this.plantcodeService.getdatacareer(this.mobile_no1)
      setTimeout(() => {

        this.career = this.plantcodeService.career
        console.log("mmmmmmmmmmmmmmmmmmmmmmmmm",this.plantcodeService.career)

        for(var i = 0; i<4; i++)
        {
          if(this.career[i]?.company_name != null)
            this.flag = false

        
        if(this.career[i]?.company_name == 'undefined')
           this.career[i].company_name = ''
        if(this.career[i]?.designation == 'undefined')
           this.career[i].designation = ''
        if(this.career[i]?.period_from == 'undefined')
           this.career[i].period_from = ''
        if(this.career[i]?.period_to  == 'undefined' )
           this.career[i].period_to  = ''
        if(this.career[i]?.last_salary ==  'undefined' )
           this.career[i].last_salary = ''
        if(this.career[i]?.leaving_reason == 'undefined')
           this.career[i].leaving_reason = ''

        this.prevData[i].name =    this.career[i]?.company_name
        this.prevData[i].desig =   this.career[i]?.designation
        this.prevData[i].periodf = this.career[i]?.period_from
        this.prevData[i].periodt = this.career[i]?.period_to
        this.prevData[i].sal =     this.career[i]?.last_salary
        this.prevData[i].reason =  this.career[i]?.leaving_reason

        }


        // this.prevData[0].name = this.career[0]?.company_name1
        // this.prevData[0].desig = this.career[0]?.designation1
        // this.prevData[0].periodf = this.career[0]?.period_from1
        // this.prevData[0].periodt = this.career[0]?.period_to1
        // this.prevData[0].sal = this.career[0]?.last_salary1
        // this.prevData[0].reason = this.career[0]?.leaving_reason1

        // this.prevData[1].name = this.career[0]?.company_name2
        // this.prevData[1].desig = this.career[0]?.designation2
        // this.prevData[1].periodf = this.career[0]?.period_from2
        // this.prevData[1].periodt = this.career[0]?.period_to2
        // this.prevData[1].sal = this.career[0]?.last_salary2
        // this.prevData[1].reason = this.career[0]?.leaving_reason2
        
        // this.prevData[2].name = this.career[0]?.company_name3
        // this.prevData[2].desig = this.career[0]?.designation3
        // this.prevData[2].periodf = this.career[0]?.period_from3
        // this.prevData[2].periodt = this.career[0]?.period_to3
        // this.prevData[2].sal = this.career[0]?.last_salary3
        // this.prevData[2].reason = this.career[0]?.leaving_reason3

        // this.prevData[3].name = this.career[0]?.company_name4
        // this.prevData[3].desig = this.career[0]?.designation4
        // this.prevData[3].periodf = this.career[0]?.period_from4
        // this.prevData[3].periodt = this.career[0]?.period_to4
        // this.prevData[3].sal = this.career[0]?.last_salary4
        // this.prevData[3].reason = this.career[0]?.leaving_reason4

      }, 1000);

      this.sendData()
    }  

    submit()   
     {
      
    console.log(this.prevData)

        console.log('family', this.prevData);

        this.plantcodeService.submitprev()

        this.state = true
        setTimeout(() => {
            this.state = false
        }, 2000);

      }
  
  sendData(){
    this.plantcodeService.prev = this.prevData
  } 

  public valid(){
    if(this.prevData[0].desig != '' && this.prevData[0].name != '' && this.prevData[0].periodf != '' && this.prevData[0].periodt != '' && this.prevData[0].reason != ''  && this.prevData[0].sal != ''  && this.prevData[0].sno != '')
      this.flag = false
  }
  
  valids(event :any){

    if(this.prevData[0].desig != '' && this.prevData[0].name != '' && this.prevData[0].periodf != '' && this.prevData[0].periodt != '' && this.prevData[0].reason != ''  && this.prevData[0].sal != ''  && this.prevData[0].sno != '')
    {
      console.log("good to go")
      this.flag = false
    }
    else
    {
      console.log(event.target.value.length)
      if(event.target.value.length == 0)
        this.flag = true
    }
  
  
  }

  
  //     this.http.
  //     post(' http://localhost:3000/lang', this.languageList)
  //     .subscribe({
  //       next: (response) => console.log(response),
  //       error: (error) => console.log(error),
  //   })
  // }
  }
  