import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormService } from '../../form.service';
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
import { threadId } from 'worker_threads';



@Component({
  selector: 'app-familyedit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.css'],
  animations: [
    trigger('slowAnimate', [
      transition(':enter', [style({opacity: '0'}), animate(500)]),
      transition(':leave', [style({opacity: '1'}), animate(500, style({opacity: '0'}))]),
    ])
  ]
  
})
export class FamilyEditComponent implements OnInit {
  @Output() emit = new EventEmitter<any>()
  message = {'fam':false}
  message_bad = {'fam':true}

relation: any = ['Father', 'Mother', 'Brother', 'Sister', 'Son', 'Daughter', 'Wife']
dependent: any = ['Dependent', 'Self-Sufficient']
mobile: any
mobile_validate : any = false
family : any = []
mobile_no1:any =
  {
    "mobile" : this.active.snapshot.paramMap.get('mobile_no1'),
    'company':  this.active.snapshot.paramMap.get('company')

  }


familyData = [
  {
    'sno':'1',
    'name': '',
    'relation': '',
    'age': 0,
    'occupation': '',
    'contactnumber': '',
    'dependent': '',
    'mobile': this.active.snapshot.paramMap.get('mobile_no1'),
    'company':  this.active.snapshot.paramMap.get('company')
  },
  {
    'sno':'2',
    'name': '',
    'relation': '',
    'age': '',
    'occupation': '',
    'contactnumber': '',
    'dependent': ''
  },
  {
    'sno':'3',
    'name': '',
    'relation': '',
    'age': '',
    'occupation': '',
    'contactnumber': '',
    'dependent': ''
  },
  {
    'sno':'4',
    'name': '',
    'relation': '',
    'age': '',
    'occupation': '',
    'contactnumber': '',
    'dependent': ''
  },
];
  flag: any = true;
  state: boolean;
  age_validate: boolean;

  constructor(private http: HttpClient, private cookie: CookieService, private formservice: FormService, private active :ActivatedRoute ) {
    this.mobile = this.active.snapshot.paramMap.get('mobile_no1')
   }


  ngOnInit(): void {
    this.formservice.getdatafamily(this.mobile_no1)
    .subscribe({
      next: (response) => {
        console.log("family",response);
       this.family = response;
      for(var i= 0; i<4 ;i++)
      {

                
        if(this.family[i]?.relation_name == 'undefined')
           this.family[i].relation_name = ''
        if(this.family[i]?.relation_type == 'undefined')
           this.family[i].relation_type = ''
        if(this.family[i]?.age == 'undefined')
           this.family[i].age = ''
        if(this.family[i]?.occupation  == 'undefined' )
           this.family[i].occupation  = ''
        if(this.family[i]?.contact_number ==  'undefined' )
           this.family[i].contact_number = ''
        if(this.family[i]?.dependent == 'undefined')
           this.family[i].dependent = ''


        if(this.family[i]?.relation_name != null)
          this.flag = false
        this.familyData[i].name = this.family[i]?.relation_name
        this.familyData[i].relation = this.family[i]?.relation_type
        this.familyData[i].age = this.family[i]?.age
        this.familyData[i].occupation = this.family[i]?.occupation
        this.familyData[i].contactnumber = this.family[i]?.contact_number
        this.familyData[i].dependent = this.family[i]?.dependent

        if(this.familyData[i].dependent == '0')
          this.familyData[i].dependent = 'Self-Sufficient'
        else
        this.familyData[i].dependent = 'Dependent'
      }
      
      this.sendData()

      if((this.familyData[0].age != 0 &&  this.familyData[0].age !=undefined) && (this.familyData[0].contactnumber != ''&&this.familyData[0].contactnumber != undefined) && (this.familyData[0].name != '' && this.familyData[0].name !=   undefined) && (this.familyData[0].occupation != ''&& this.familyData[0].occupation != undefined) && (this.familyData[0].relation != ''&& this.familyData[0].relation != undefined))
      {
        console.log("1",this.familyData)
        this.flag = false
        this.emit.emit(this.message)
      }
     } ,
      error: (error) => console.log(error),
    })
    
    this.sendData()
  }  
  submit(){

    if(this.familyData[0].age == '' || this.familyData[0].contactnumber == '' || this.familyData[0].name == '' || this.familyData[0].occupation == '' || this.familyData[0].relation == '')
    {
        this.flag = true
    }
    else
    {
      console.log('family', this.familyData);
      this.formservice.submitfamily()
      this.state = true
      setTimeout(() => {
          this.state = false
      }, 2000);
      
    }
}

sendData(){
  this.formservice.fam = this.familyData
} 

public valid(){
  if((Number(this.familyData[0].age) <= 100 && this.familyData[0].age != 0 &&  this.familyData[0].age !=undefined) && (this.familyData[0].contactnumber != '' && this.familyData[0].contactnumber != undefined && String(this.familyData[0].contactnumber).length == 10 ) && (this.familyData[0].name != '' && this.familyData[0].name !=   undefined) && (this.familyData[0].occupation != ''&& this.familyData[0].occupation != undefined) && (this.familyData[0].relation != ''&& this.familyData[0].relation != undefined))
  {
    this.flag = false
    this.emit.emit(this.message)
  }
  else
  {
    this.flag = true
  }
}

valids(event :any, item:any){
  console.log(event.length);
  
  if((Number(this.familyData[0].age)<=100 && this.familyData[0].age != 0 &&  this.familyData[0].age !=undefined) && (this.familyData[0].contactnumber != ''&&this.familyData[0].contactnumber != undefined) && (this.familyData[0].name != '' && this.familyData[0].name !=   undefined) && (this.familyData[0].occupation != ''&& this.familyData[0].occupation != undefined) && (this.familyData[0].relation != ''&& this.familyData[0].relation != undefined))
  {
    if(item == 'ContactNumber')
      {
        if(event.target.value.length == 10)
        {
          this.flag = false
          this.mobile_validate = false
        }
        else
        {
          this.flag = true
          this.mobile_validate = true
        }
      } 
    else if(item =='age')
      {
        if(event.value <= 100)
        {
          this.flag = false
          this.age_validate = false
        }
        else
        {
          this.flag = true
          this.age_validate = true
        }
      }
    else
    {
      console.log(this.familyData)
      console.log("good to go")
      this.flag = false
      this.emit.emit(this.message)
    }
  }
  else
  {
    // if(event == null || event.length == 0)
    // {
      this.flag = true
      this.emit.emit(this.message_bad)
    // }

  }
}
}
