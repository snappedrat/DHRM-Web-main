import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../plantcode.service';
import { Router, RouterLinkActive } from '@angular/router';
import { format } from 'path';
import { threadId } from 'worker_threads';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-trainee-application',
  templateUrl: './trainee-application.component.html',
  styleUrls: ['./trainee-application.component.css']
})



export class TraineeApplicationComponent implements OnInit{

  mobilenum : any = ''
  companyname:any = ''
  plantname:any
  isHrappr: any;
  url = environment.path

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
      pass: ['', Validators.required]
   });
   this.mobilenum = this.bankForms.controls['mobileNumber'].value
   this.companyname = this.bankForms.controls['company'].value
}

plantcode:any;
companycode : any;
errmsg: any = '';  

ngOnInit(): void {

  this.getcompanycode()
  this.plantcodeService.getHr('newuser')
  .subscribe({
    next: (response)=>{console.log("hr",response); this.isHrappr = response
    sessionStorage.setItem('ishr', this.isHrappr[0]?.Is_HR)
    sessionStorage.setItem('ishrappr', this.isHrappr[0]?.Is_HRAppr)}
  })
}

getplantcode(event:any){
    console.log(event.target.value);
    this.bankForms.controls['plant'].setValue('')
    var company = {'company_name': event.target.value}
    this.http.post(this.url+'/plantcodelist',company)
    .subscribe({
      next: (response) =>{ console.log(response); this.plantcode = response },
      error: (error) => console.log(error),
    });
}

getcompanycode(){

  this.http.post(this.url+'/companycodelist', '')
  .subscribe({
    next: (response) =>{ console.log(response); this.companycode = response },
    error: (error) => console.log(error),
  });
}

sendFormData()
{
  if(this.bankForms.invalid)
  {
    window.alert('mandatory feilds are not yet filled')
  }
  else{

    this.companyname = this.bankForms.controls['company'].value
  
    this.http.post(this.url+'/traineeformdata', this.bankForms.value)
    .subscribe({
      next: (response) => {console.log("vathuchaaa",response);this.errmsg=response;
      if(this.errmsg.status == 'newform')
      {  console.log("newform");this.router.navigate(['/forms',this.mobilenum,this.companyname])}
    else if(this.errmsg.status == 'incomplete')
      { this.router.navigate(['/forms',this.mobilenum,this.companyname])  }
    else if(this.errmsg.status == 'registered')
      {window.alert("Your application has already been registered. kindly contact HR department");console.log(this.bankForms.value)}},
      error: (error) => console.log(error),
    })
  }
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
  this.bankForms.controls['pass'].setValue( this.bankForms.controls['mobileNumber'].value.substr(-4))
 this.Tvalue = this.bankForms.controls['mobileNumber'].value.substr(-4) ;
}
}



