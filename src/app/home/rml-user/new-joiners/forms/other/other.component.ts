import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators,FormBuilder } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent  {
  Works:any=['Y','N'];
  Relations:any=['Y','N'];
  forms: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private http: HttpClient, private cookie:CookieService , private plantcodeService : PlantcodeService) {
    this.forms = fb.group({ 
      known:['',Validators.required],
      work:['',Validators.required],
      names:['',Validators.required],
      place:['',Validators.required],
      com:['',Validators.required],
      extra:['',Validators.required],
      mobilenumber : new UntypedFormControl(this.cookie.get('mobilenum'))

   })


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
  console.log(this.forms.value)
  if(this.forms.value.length == 0){
      console.log("good");
    }
    else{
      this.plantcodeService.submitfamily()
    }
}
sendData(){
  this.plantcodeService.other = this.forms.value
} 
}
