import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../plantcode.service';


@Component({
  selector: 'app-trainee-application',
  templateUrl: './trainee-application.component.html',
  styleUrls: ['./trainee-application.component.css']
})



export class TraineeApplicationComponent implements OnInit{

  mobilenum : any = ''
  setCookie(){
    this.cookie.set("mobilenum", this.mobilenum)
}

  items :any[] = [];

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
  constructor(private fb: FormBuilder,private http: HttpClient, private cookie: CookieService,private plantcodeService: PlantcodeService ) {
    this.bankForms = fb.group({ 
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      company:['',Validators.required],
      plant:['',Validators.required],
      pass: [this.Tvalue ]
   });
  //  this.mobilenum = this.bankForms.mobileNumber

}

plantcode:any;
companycode : any;
errmsg: any;

ngOnInit(): void {
  this.getplantcode()
  this.getcompanycode()
}

getplantcode(){

    console.log('====================================');
    console.log('service');
    console.log('====================================');
    this.http.post('http://localhost:3000/plantcodelist', '')
    .subscribe({
      next: (response) =>{ console.log(response); this.plantcode = response },
      error: (error) => console.log(error),
    });
}

getcompanycode(){

  this.http.post('http://localhost:3000/companycodelist', '')
  .subscribe({
    next: (response) =>{ console.log(response); this.companycode = response },
    error: (error) => console.log(error),
  });
}

sendFormData()
{
  this.http.post('http://localhost:3000/traineeformdata', this.bankForms.value)
  .subscribe({
    next: (response) => this.errmsg=response,
    error: (error) => console.log(error),
  })
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



