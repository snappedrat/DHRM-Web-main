import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, UntypedFormControl, Validators,FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css']
})
export class EmergencyComponent implements OnInit  {
relations :any = ['Father','Mother','Sister','Brother'];
uniqueId :any = {'mobile':''}
emer : any = []

 form: FormGroup = new FormGroup({});  
   constructor(private fb: FormBuilder, private http: HttpClient,private cookie:CookieService, private plantcodeService : PlantcodeService, private active : ActivatedRoute) {
    this.form = fb.group({
      contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactName:['',Validators.required],
      relations:['',Validators.required],
      mobilenumber : new UntypedFormControl(this.active.snapshot.paramMap.get('mobile_no1'))

    })  
  }  

  ngOnInit(): void {
      this.getdatabasic()
      setTimeout(() => {
        this.form.controls['contactNumber'].setValue(this.emer[0]?.mobile_no2)
        this.form.controls['contactName'].setValue(this.emer[0]?.emergency_name)
        this.form.controls['relations'].setValue(this.emer[0]?.emergency_rel)
        this.sendData()
      }, 1000);
      this.sendData()
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

getdatabasic(){
  this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');

  this.http.
post('http://localhost:3000/getdatabasic',this.uniqueId)
.subscribe({
  next: (response) => {console.log("bank : ",response); this.emer = response} ,
  error: (error) => console.log(error),
})
}


}
