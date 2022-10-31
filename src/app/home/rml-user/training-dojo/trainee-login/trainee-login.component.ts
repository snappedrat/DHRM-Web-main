import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../new-joiners/plantcode.service';
import { Router, RouterLinkActive } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';


@Component({
  selector: 'app-trainee-login',
  templateUrl: './trainee-login.component.html',
  styleUrls: ['./trainee-login.component.css']
})
export class TraineeLoginComponent implements OnInit {


  public inputType:string ='password';
  message : any;

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
 form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder,private http: HttpClient, private cookie: CookieService,private plantcodeService: PlantcodeService,private service: ApiService, private router : Router ) {
    this.form= fb.group({ 
      username: ['',Validators.required],
      pass: ['', Validators.required]

   });
}


ngOnInit(): void {


  this.plantcodeService.getHr('newuser')

}


TraineeLogin()
{
  if(this.form.invalid)
  {
    window.alert('please enter correct user name and password')
  }
  else
  {
    this.service.traineeLogin(this.form.value)
    .subscribe({
      next : (response)=>{console.log(response); this.message = response;console.log(this.message)
      if(this.message.status == 'success')
      {
        console.log('ulla vanten')
        sessionStorage.setItem('user_token', this.message.token)
        this.router.navigate(['/rml/training_dojo/training-modules'])
      }
      else if(this.message.status == 'wrong_user')
        alert('Username is incorrect')
      else if(this.message.status == 'wrong_pass')
        alert('Password is incorrect')
      else if(this.message.status == 'wrong_apln')
        alert("you still haven't registered ")
 },
      error: (err)=>console.error(err)
    })
  }

  // console.log("can login", this.form.value)


}

get f()
{
  return this.form.controls;  
}

}
