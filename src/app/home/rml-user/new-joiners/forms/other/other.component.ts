import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators,FormBuilder } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent  {
  Works:any=['Y','N'];
  Relations:any=['Y','N'];
  forms: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private http: HttpClient, private cookie:CookieService    ) {
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
  console.log(this.forms.value);
  let formData: any = new FormData();
  formData.append('known',this.forms.get('known')!.value);
  formData.append('work',this.forms.get('work')!.value);
  formData.append('names',this.forms.get('names')!.value);
  formData.append('place',this.forms.get('place')!.value);
  formData.append('com',this.forms.get('com')!.value);
  formData.append('extra',this.forms.get('extra')!.value);
  this.http
      .post('http://localhost:3000/others', this.forms.value)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
} 
}
