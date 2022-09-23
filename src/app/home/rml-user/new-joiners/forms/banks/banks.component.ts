import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UntypedFormGroup, FormControl, Validators, UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
@Component({
    selector: 'app-banks',
    templateUrl: './banks.component.html',
    styleUrls: ['./banks.component.css']
})
export class BanksComponent {
    Bank:any=['AXIS Bank','HDFC Bank','CANARA Bank','Punjab National Bank','Bank of Baroda',
'Bank of India',
'Bank of Maharashtra',
'Canara Bank',
'Central Bank of India',
'Indian Bank',
'Indian Overseas Bank',
'Punjab & Sind Bank',
'Punjab National Bank',
'state Bank of India',
'UCO Bank',
'Union Bank of India'];
    form: UntypedFormGroup;
    sno: any;
    constructor(private fb: UntypedFormBuilder, private http: HttpClient, private cookie : CookieService) {
        this.form = fb.group({
            sno: new UntypedFormControl(' '),
            account:['',Validators.required],
            ifsc:['',Validators.required],
            bankName:['',Validators.required],
            mobilenumber: new UntypedFormControl(this.cookie.get('mobilenum'))
        })
    }

    get account()
    {
        return this.form.controls;
    }
    get ifsc()
    {
        return this.form.controls;
    }
    get bankName()
    {
        return this.form.controls;
    }
    submit(){
        console.log(this.form.value);
        this.http
            .post('http://localhost:3000/bankforms', this.form.value)
            .subscribe({
                next: (response) => console.log(response),
                error: (error) => console.log(error),
            });
    }
}
