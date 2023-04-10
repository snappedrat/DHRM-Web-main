import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormService } from '../form.service';
import { Router, RouterLinkActive } from '@angular/router';
import { format } from 'path';
import { threadId } from 'worker_threads';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from 'src/app/home/api.service';

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
  constructor(private fb: FormBuilder,private http: HttpClient, private cookie: CookieService, private router : Router, private service : ApiService ) {
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

show()
{
  console.log(this.bankForms.value)
}

ngOnInit(): void {

  this.getcompanycode()
  
}

getplantcode(event:any){
    console.log(event.target.value);
    this.bankForms.controls['plant'].setValue('')
    var company = {'company_name': event.target.value.split('.')[1].trim()}

    this.service.getPlantCode(company)
    .subscribe({
      next: (response) =>{ this.plantcode = response },
      error: (error) => console.log(error),
    });
}

getcompanycode(){

  this.service.getCompanyCode()
  .subscribe({
    next: (response) =>{ this.companycode = response },
    error: (error) => console.log(error),
  });
}

sendFormData()
{
  var x = this.bankForms.controls['company'].value.split('.')[0].trim()
  var y = this.bankForms.controls['company'].value.split('.')[1].trim()
  this.bankForms.controls['company'].setValue(this.companycode[x-1].sno)

  if(this.bankForms.invalid)
  {
    window.alert('mandatory feilds are not yet filled')
  }
  else{

    this.companyname = this.companycode[x-1].sno

    this.service.traineeFormData(this.bankForms.value)
    .subscribe({
      next: (response:any) => {console.log("vathuchaaa",response);this.errmsg=response;
      if(this.errmsg.status == 'newform')
      {
        this.service.getHr({username:'newuser', user:'emp2'})
        .subscribe({
          next: (response)=>{console.log("hr",response); this.isHrappr = response
          sessionStorage.setItem('ishr', this.isHrappr[0]?.Is_HR)
          sessionStorage.setItem('ishrappr', this.isHrappr[0]?.Is_HRAppr)
          sessionStorage.setItem('user', 'emp2')
          this.router.navigate(['/forms',this.mobilenum,this.companyname])
        }
        })
      }
    else if(this.errmsg.status == 'incomplete')
      { 
        this.service.getHr({username:'newuser', user:'emp2'})
        .subscribe({
          next: (response)=>{console.log("hr",response); this.isHrappr = response
          sessionStorage.setItem('ishr', this.isHrappr[0]?.Is_HR)
          sessionStorage.setItem('ishrappr', this.isHrappr[0]?.Is_HRAppr)
          sessionStorage.setItem('user', 'emp2')
          this.router.navigate(['/forms',this.mobilenum,this.companyname]) 
        }
        })

      }
    else if(this.errmsg.status == 'registered')
      {window.alert("Your application has already been registered. kindly contact HR department");console.log(this.bankForms.value)}},
      error: (error:any) => console.log(error),
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
getPassword(event:any){

  if(event?.length == 10)
  {
    this.bankForms.controls['pass'].setValue( this.bankForms.controls['mobileNumber'].value.substr(-4))
    this.Tvalue = this.bankForms.controls['mobileNumber'].value.substr(-4) ;
  }

}
}



