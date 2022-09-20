import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UntypedFormGroup, FormControl, Validators, UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
@Component({
    selector: 'app-banks',
    templateUrl: './banks.component.html',
    styleUrls: ['./banks.component.css']
})
export class BanksComponent {
    Bank:any=['AXIS Bank','HDFC Bank','CANARA Bank','Punjab National Bank'];
    form: UntypedFormGroup;
    sno: any;
    constructor(private fb: UntypedFormBuilder, private http: HttpClient) {
        this.form = fb.group({
            sno: new UntypedFormControl(' '),
            account:['',Validators.required],
            ifsc:['',Validators.required],
            bankName:['',Validators.required],
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
        let formData: any = new FormData();
        console.log(this.sno);
        formData.set('sno',this.sno);
        console.log(formData.get('sno'));
        formData.append('account',this.form.get('account')!.value);
        formData.append('ifsc',this.form.get('ifsc')!.value);
        formData.append('bankName',this.form.get('bankName')!.value);
        formData.append('sno', formData.get('sno'));
        this.http
            .post('http://localhost:3000/bankforms', this.form.value)
            .subscribe({
                next: (response) => console.log(response),
                error: (error) => console.log(error),
            });
    }
}
