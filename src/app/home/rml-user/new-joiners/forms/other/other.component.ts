import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators,FormBuilder, NgControl } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {
  Works:any=['Yes','No'];
  Relations:any=['Yes','No'];
  uniqueId :any = {'mobile':''}
  other : any = []

  forms: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private http: HttpClient, private cookie:CookieService , private plantcodeService : PlantcodeService, private active: ActivatedRoute) {
    this.forms = fb.group({ 
      known:[''],
      work:[''],
      names:[''],
      place:[''],
      com:[''],
      extra:[''],
      mobilenumber : [this.active.snapshot.paramMap.get('mobile_no1')]

   })


}
ngOnInit(): void {


  this.getdatabasic()
  setTimeout(() => {
    this.other = this.plantcodeService.basicdetails
    if(this.other[0]?.any_empl_rane == 'undefined' || this.other[0]?.prev_rane_empl == 'undefined' || this.other[0]?.existing_empl_name == 'undefined'||this.other[0]?.prev_rane_exp == 'undefined'||this.other[0]?.existing_empl_company == 'undefined' ||this.other[0]?.extra_curricular == 'undefined' ){
        console.log("enter some values")
  }
  else{
    if(this.other[0]?.any_empl_rane == 'Y')
    this.other[0].any_empl_rane = 'Yes'
    else if(this.other[0]?.any_empl_rane == 'N')
    this.other[0].any_empl_rane = 'No'

    if(this.other[0]?.prev_rane_empl == 'Y')
    this.other[0].prev_rane_empl = 'Yes'
    else if(this.other[0]?.prev_rane_empl == 'N')
    this.other[0].prev_rane_empl = 'No'

    this.forms.controls['known'].setValue(this.other[0]?.any_empl_rane)
    this.forms.controls['work'].setValue(this.other[0]?.prev_rane_empl)
    this.forms.controls['names'].setValue(this.other[0]?.existing_empl_name)
    this.forms.controls['place'].setValue(this.other[0]?.prev_rane_exp)
    this.forms.controls['com'].setValue(this.other[0]?.existing_empl_company)
    this.forms.controls['extra'].setValue(this.other[0]?.extra_curricular)
  }
    this.sendData()
    
  }, 1000);
}
get known()
{
  return this.forms.controls;  
}
get work()
{
  return this.forms.controls;  
}
get names()
{
  return this.forms.controls; 
}
get place()
{
  return this.forms.controls; 
}
get com()
{
  return this.forms.controls; 
}
get extra()
{
  return this.forms.controls; 
}
submit(){
  console.log("here ir is  :  ",this.forms.value)
  if(this.forms.value.length == 0){
      console.log("good");
    }
    else{
      this.plantcodeService.submitother()
    }

}
sendData(){
  this.plantcodeService.other = this.forms.value
} 

getdatabasic(){
  this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');
  this.plantcodeService.getdatabasic(this.uniqueId)

//   this.http.
// post('http://localhost:3000/getdatabasic',this.uniqueId)
// .subscribe({
//   next: (response) => {console.log("bank : ",response); this.other = response} ,
//   error: (error) => console.log(error),
// })
}

}
