import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UntypedFormGroup, UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-banks',
    templateUrl: './banks.component.html',
    styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit{
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

uniqueId :any = {'mobile':''}
bank : any = []

    form: UntypedFormGroup;
    sno: any;
    constructor(private fb: UntypedFormBuilder, private http: HttpClient, private cookie : CookieService, public plantcodeService: PlantcodeService, private active : ActivatedRoute) {
        this.form = fb.group({
            sno: new UntypedFormControl(' '),
            account:[''],
            ifsc:[''],
            bankName:[''],
            mobilenumber: new UntypedFormControl(this.cookie.get('mobilenum'))
        })
    }

    ngOnInit(): void {
        this.getdatabasic()
        setTimeout(() => {
            this.form.controls['account'].setValue(this.bank[0]?.bank_account_number)
            this.form.controls['ifsc'].setValue(this.bank[0]?.ifsc_code)
            this.form.controls['bankName'].setValue(this.bank[0]?.bank_name)
            this.sendData()
        }, 1000);
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
        this.plantcodeService.submitbank()
    }
    sendData(){
        this.plantcodeService.bank = this.form.value
    }

    getdatabasic(){
        this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');

        this.http.
      post('http://localhost:3000/getdatabasic',this.uniqueId)
      .subscribe({
        next: (response) => {console.log("bank : ",response); this.bank = response} ,
        error: (error) => console.log(error),
      })
      }
    
}
