import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormService } from '../../new-joiners/form.service';
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
  loading = false

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
  constructor(private fb: FormBuilder,private http: HttpClient, private cookie: CookieService,private formservice: FormService,private service: ApiService, private router : Router ) {
    this.form= fb.group({ 
      username: ['',Validators.required],
      pass: ['', Validators.required]

   });
}


ngOnInit(): void {


  this.service.getHr('newuser')

}


TraineeLogin()
{
  this.loading = true
  var username = this.form.controls['username'].value
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
        sessionStorage.setItem('user', 'test')
        sessionStorage.setItem('token', this.message.token)
        localStorage.setItem('token', this.message.token)
        this.router.navigate(['/trainee-test', username])
      }
      else if(this.message.status == 'wrong_user')
      {
        this.loading = false
        alert('Username is incorrect')

      }
      else if(this.message.status == 'wrong_pass')
      {
        this.loading = false
        alert('Password is incorrect')

      }
      else if(this.message.status == 'wrong_apln')
      {
        this.loading = false
        alert("you still haven't registered ")
      }
    },
      error: (err)=>console.error(err)
    })
  }

}

get f()
{
  return this.form.controls;  
}

}