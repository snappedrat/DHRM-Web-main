import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { leadingComment } from '@angular/compiler';
import { send } from 'process';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prev-edit',
  templateUrl: './prev-edit.component.html',
  styleUrls: ['./prev-edit.component.css']
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
  
    constructor(private http: HttpClient, private cookie: CookieService, private plantcodeService: PlantcodeService, private active: ActivatedRoute ) { }
  
    ngOnInit(): void {
      this.plantcodeService.getdatacareer(this.mobile_no1)
      setTimeout(() => {

        this.career = this.plantcodeService.career
        
        this.prevData[0].name = this.career[0]?.company_name1
        this.prevData[0].desig = this.career[0]?.designation1
        this.prevData[0].periodf = this.career[0]?.period_from1
        this.prevData[0].periodt = this.career[0]?.period_to1
        this.prevData[0].sal = this.career[0]?.last_salary1
        this.prevData[0].reason = this.career[0]?.leaving_reason1

        this.prevData[1].name = this.career[0]?.company_name2
        this.prevData[1].desig = this.career[0]?.designation2
        this.prevData[1].periodf = this.career[0]?.period_from2
        this.prevData[1].periodt = this.career[0]?.period_to2
        this.prevData[1].sal = this.career[0]?.last_salary2
        this.prevData[1].reason = this.career[0]?.leaving_reason2
        
        this.prevData[2].name = this.career[0]?.company_name3
        this.prevData[2].desig = this.career[0]?.designation3
        this.prevData[2].periodf = this.career[0]?.period_from3
        this.prevData[2].periodt = this.career[0]?.period_to3
        this.prevData[2].sal = this.career[0]?.last_salary3
        this.prevData[2].reason = this.career[0]?.leaving_reason3

        this.prevData[3].name = this.career[0]?.company_name4
        this.prevData[3].desig = this.career[0]?.designation4
        this.prevData[3].periodf = this.career[0]?.period_from4
        this.prevData[3].periodt = this.career[0]?.period_to4
        this.prevData[3].sal = this.career[0]?.last_salary4
        this.prevData[3].reason = this.career[0]?.leaving_reason4

        for(var i = 0; i<=3; i++){
          if(this.prevData[i].name == 'null' || 'undefined' || undefined)
            this.prevData[i].name = ''
            if(this.prevData[i].desig == 'null' || 'undefined' || undefined)
            this.prevData[i].desig = ''
            if(this.prevData[i].periodf == 'null' || 'undefined' || undefined)
            this.prevData[i].periodf = ''
            if(this.prevData[i].periodt  == 'null' || 'undefined' || undefined)
            this.prevData[i].periodt  = ''
            if(this.prevData[i].sal == 'null' || 'undefined' || undefined)
            this.prevData[i].sal = ''
            if(this.prevData[i].reason == 'null' || 'undefined' || undefined)
            this.prevData[i].reason = ''
        }

      }, 1000);

      this.sendData()
    }  

    submit()   
     {
      
    console.log(this.prevData)

      if(this.prevData[0].desig == '' || this.prevData[0].name == '' || this.prevData[0].periodf == '' || this.prevData[0].periodt == ''|| this.prevData[0].reason == '' || this.prevData[0].sal == '')
      {
        this.flag = true
      }
      else
      {
        console.log('family', this.prevData);

        console.log("good");

        this.plantcodeService.submitprev()
      }

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
  //     post('http://localhost:3000/lang', this.languageList)
  //     .subscribe({
  //       next: (response) => console.log(response),
  //       error: (error) => console.log(error),
  //   })
  // }
  }
  