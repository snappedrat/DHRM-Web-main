import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trainee-application',
  templateUrl: './trainee-application.component.html',
  styleUrls: ['./trainee-application.component.css']
})

export class TraineeApplicationComponent {
  url='http://localhost:3000/compnamedown';
  items :any[] = [];
  PlantName:any=['plant code1','plant code2','plant code3'];
  public inputType:string ='password';
  public Tvalue:string='';
  public updateInput(event:any):void
  {
      if(event.target.checked)
      {
        this.inputType ='text';
      }
      else{
        this.inputType ='password';
      }
  }
 bankForms: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.bankForms = fb.group({ 
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      company:['',Validators.required],
      plant:['',Validators.required],
   });
}

get company()
{
  return this.bankForms.controls;  
}
get plant()
{
  return this.bankForms.controls;  
}
get f()
{
  return this.bankForms.controls;  
}
submit(){  
  console.log(this.bankForms.value);  
}
getPasswors(){
 this.Tvalue = this.bankForms.controls['mobileNumber'].value.substr(-4) ;
}
}
