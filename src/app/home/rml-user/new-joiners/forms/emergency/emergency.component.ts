import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, UntypedFormControl, Validators,FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css']
})
export class EmergencyComponent  {
relations :any = ['Father','Mother','Sister','Brother'];
 form: FormGroup = new FormGroup({});  
   constructor(private fb: FormBuilder, private http: HttpClient,private cookie:CookieService, private plantcodeService : PlantcodeService) {
    this.form = fb.group({
      contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactName:['',Validators.required],
      relations:['',Validators.required],
      mobilenumber : new UntypedFormControl(this.cookie.get('mobilenum'))

    })  
  }  

  get f(){  
    return this.form.controls;  
  }
  get r(){  
    return this.form.controls;  
  }

  get name(){  
    return this.form.controls;  
  }
 
submit(){
    console.log(this.form.value);
    if(this.form.value.length == 0){
      console.log("good");
    }
    else{
      this.plantcodeService.submitemer()
    }
}
sendData(){
    this.plantcodeService.emer = this.form.value
} 
  
}
