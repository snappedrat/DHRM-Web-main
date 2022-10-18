import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../plantcode.service';
import { Router, RouterLinkActive } from '@angular/router';
import { sub } from 'date-fns';


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
  constructor(private fb: FormBuilder,private http: HttpClient, private cookie: CookieService,private plantcodeService: PlantcodeService, private router : Router ) {
    this.bankForms = fb.group({ 
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      company:['',Validators.required],
      plant:['',Validators.required],
      pass: [this.Tvalue ]
   });
   this.mobilenum = this.bankForms.controls['mobileNumber'].value
   this.bankForms.get('pass')?.disable();

}

plantcode:any;
companycode : any;
errmsg: any = '';  

ngOnInit(): void {
  this.getplantcode()
  this.getcompanycode()
  this.plantcodeService.getHr('newuser')

}

dum(){
  console.log('====================================');
  console.log("kekuthasaaaaaa");
  console.log('====================================');
  console.log('mobile',this.mobilenum)
}

getplantcode(){

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
  console.log("kekuthulaaaaaaaaaaa")

  this.http.post('http://localhost:3000/traineeformdata', this.bankForms.value)
  .subscribe({
    next: (response) => {console.log("vathuchaaa",response);this.errmsg=response;
    if(this.errmsg.status == 'newform')
    {  console.log("newform");this.router.navigate(['/forms',this.mobilenum])}
  else if(this.errmsg.status == 'incomplete')
    { this.router.navigate(['/forms',this.mobilenum])  }
  else if(this.errmsg.status == 'registered')
    {window.alert("YOU have already registered")}},
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



