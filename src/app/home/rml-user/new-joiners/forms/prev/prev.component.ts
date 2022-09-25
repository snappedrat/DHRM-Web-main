import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,UntypedFormControl,Validator, FormArray, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import {HttpClient} from "@angular/common/http";
import { PlantcodeService } from '../../plantcode.service';
@Component({
  selector: 'app-prev',
  templateUrl: './prev.component.html',
  styleUrls: ['./prev.component.css']
})
export class PrevComponent implements OnInit {
  fg : FormGroup
  constructor(private fb:FormBuilder, private http:HttpClient, private cookie:CookieService, private plantcodeService : PlantcodeService) {
    this.fg = this.fb.group({
      prev:this.fb.array([])
    })
    this.AddRow();
   }
   get prevArray()
   {
      return this.fg.get('prev') as FormArray;
   }
   AddRow()
   {
   
    const prevGroup = this.fb.group({
      nameOfCompany:['',[Validators.required]],
      desig:['',[Validators.required]],
      pof:['',[Validators.required]],
      pot:['',[Validators.required]],
      sld:['',[Validators.required,  Validators.pattern("^[0-9]*$")]],
      rfl:['',[Validators.required]],
      mobilenumber : new UntypedFormControl(this.cookie.get('mobilenum'))
    })
    this.prevArray.push(prevGroup);
    console.log(
      this.prevArray.controls
    );
   }
  onSubmit()
  {

      console.log(this.prevArray.value)
      if(this.prevArray.value.length == 0){
        console.log("good");
      }
      else{
        this.plantcodeService.submitprev()
      }
  }
  sendData(){
    this.plantcodeService.prev = this.prevArray.value
  } 
  ngOnInit(): void {
  }
 delRow(index:number)
 {
    this.prevArray.removeAt(index);
 }
}
