import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, FormArray, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-educational',
  templateUrl: './educational.component.html',
  styleUrls: ['./educational.component.css']
})
export class EducationalComponent implements OnInit {
  fgs : FormGroup
  constructor(private fbs:FormBuilder, private http:HttpClient) {
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
    })
    this. eduArray.push(eduGroup);
    console.log(
      this.eduArray.controls
    );
   }
  onSubmit()
  {
    console.log(this.eduArray.value)
    console.log(this.eduArray.errors)
      this.http
          .post('http://localhost:3000/edu', this.eduArray.value)
          .subscribe({
              next: (response) => console.log(response),
              error: (error) => console.log(error),
          });
  }
  ngOnInit(): void {
  }
 delRow(index:number)
 {
    this.eduArray.removeAt(index);
 }
}
