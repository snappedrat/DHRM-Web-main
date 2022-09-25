import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, FormArray, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
@Component({
  selector: 'app-educational',
  templateUrl: './educational.component.html',
  styleUrls: ['./educational.component.css']
})
export class EducationalComponent implements OnInit {
  fgs : FormGroup
  constructor(private fbs:FormBuilder, private http:HttpClient, private cookie:CookieService, private plantcodeService : PlantcodeService) {
    this.fgs = this.fbs.group({
      educational:this.fbs.array([])
    })
    this.AddRows();
   }
   get eduArray()
   {
      return this.fgs.get('educational') as FormArray;
   }
   AddRows()
   {
   
    const eduGroup = this.fbs.group({
      s_c:['',[Validators.required]],
      examPassed:['',[Validators.required]],
      YOP:['',[Validators.required]],
      mainSub:['',[Validators.required]],
      certificateNo:['',[Validators.required]],
      certifiedDate:['',[Validators.required]],
      percentage:['',[Validators.required]],
      mobilenumber : [this.cookie.get('mobilenum')]

    })
    this. eduArray.push(eduGroup);
    console.log(
      this.eduArray.controls
    );
   }
  onSubmit()
  {
    console.log(this.eduArray.value)
    this.plantcodeService.submitedu()
}
sendData(){
    this.plantcodeService.edu = this.eduArray.value
}
  ngOnInit(): void {
  }
 delRow(index:number)
 {
    this.eduArray.removeAt(index);
 }
}
