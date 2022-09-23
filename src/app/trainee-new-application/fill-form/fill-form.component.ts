import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validator, FormArray, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-prev',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.css']
})
export class PrevComponent implements OnInit {
  fg : FormGroup
  constructor(private fb:FormBuilder, private http:HttpClient) {
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
    })
    this.prevArray.push(prevGroup);
    console.log(
      this.prevArray.controls
    );
   }
  onSubmit()
  {

      console.log(this.prevArray.value)
      console.log(this.prevArray.errors)
      this.http
          .post('http://localhost:3000/prev', this.prevArray.value)
          .subscribe({
              next: (response) => console.log(response),
              error: (error) => console.log(error),
          });
  }
  ngOnInit(): void {
  }
 delRow(index:number)
 {
    this.prevArray.removeAt(index);
 }
}
