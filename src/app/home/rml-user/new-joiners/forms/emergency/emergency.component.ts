import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, UntypedFormControl, Validators,FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FormService } from '../../form.service';
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
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css'],
  animations: [
    trigger('slowAnimate', [
      transition(':enter', [style({opacity: '0'}), animate(500)]),
      transition(':leave', [style({opacity: '1'}), animate(500, style({opacity: '0'}))]),
    ])
  ]
})
export class EmergencyComponent implements OnInit  {
  @Input() emer:any = []
  @Output() emit = new EventEmitter<any>()
  message = {'emer': false}

relations :any = ['Father','Mother','Sister','Brother'];
uniqueId :any = {'mobile':''}

 form: FormGroup = new FormGroup({});  
  state: boolean;
   constructor(private fb: FormBuilder, private http: HttpClient,private cookie:CookieService, private formservice : FormService, private active : ActivatedRoute) {
    this.form = fb.group({
      contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactName:['',Validators.required],
      relations:['',Validators.required],
      mobilenumber : new UntypedFormControl(this.active.snapshot.paramMap.get('mobile_no1')),
      company: [this.active.snapshot.paramMap.get('company')]


    })  
  }  

  ngOnInit(): void {
      this.getdatabasic()

      this.sendData()
  }

  getdatabasic(){
    this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');
    this.uniqueId.company = this.active.snapshot.paramMap.get('company');
  
      this.form.controls['contactNumber'].setValue(this.emer[0]?.mobile_no2)
      this.form.controls['contactName'].setValue(this.emer[0]?.emergency_name)
      this.form.controls['relations'].setValue(this.emer[0]?.emergency_rel)

      this.sendData()

      if(this.form.valid)
        this.emit.emit(this.message)
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
      this.formservice.submitemer()
      this.state = true
      setTimeout(() => {
          this.state = false
      }, 2000);
    }
}
sendData(){
    this.formservice.emer = this.form.value
    this.emitData()
} 

emitData()
{
  if(this.form.valid)
    this.emit.emit(this.message)
}

}
