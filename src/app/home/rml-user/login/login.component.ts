import { Component, OnInit,} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {Router} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {HttpClient} from "@angular/common/http";
import { response } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';
import { CompanyComponent } from '../masters/company/company.component';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
    hide = true;
    exform: UntypedFormGroup;
    master: any;
    username: any = ''
    password:any = ''
    constructor(public fb: UntypedFormBuilder, private http: HttpClient, private router: Router, private authService: AuthService, private cookie:CookieService, private service: ApiService) {}
    ngOnInit() {

        this.exform = new UntypedFormGroup({
            'User_Name' : new UntypedFormControl('', Validators.required),
            'Password': new UntypedFormControl(null, Validators.required),
        });
    }
    setLocal(){
        sessionStorage.setItem('user_name', this.exform.value.User_Name)
        console.log(this.exform.value.User_Name)
    }

    submit() {
        if (this.exform.invalid) {
            return;
        }
            this.authService
            .login(this.exform.get('User_Name')?.value, this.exform.get('Password')?.value)
            .subscribe({
                next: (response) => {
                    console.log(response);
                    if(response.token) {
                        sessionStorage.setItem('token', response.token)
                    }
                    if(response.message == "Success") 
                    {
                        sessionStorage.setItem('user','emp')
                        this.goPlaces();
                    } 
                    else if (response.message == "User") 
                    {
                        alert("Username does not exist");
                    } else {
                        alert("Please Enter the correct Password");
                    }
                },
                error: (error) => console.log(error),
            });
    }


    goPlaces() {
        this.router.navigate(['../rml']);
    }

    // }

    get name()
    {
      return this.exform.controls
    }
}
