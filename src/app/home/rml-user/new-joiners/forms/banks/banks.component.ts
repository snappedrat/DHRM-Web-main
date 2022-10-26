import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { ActivatedRoute } from '@angular/router';
import { id } from 'date-fns/locale';
import { bankForm } from '../../../masters/bank/bank.component';


@Component({
    selector: 'app-banks',
    templateUrl: './banks.component.html',
    styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit{
    Bank:any=['AXIS BANK','HDFC Bank','CANARA Bank','Punjab National Bank','Bank of Baroda',
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
banknames :any = []
banks:any = []
temp: string = 'hellllllllllll'

flagger : any = false

    form: UntypedFormGroup;
    sno: any;
    constructor(private fb: UntypedFormBuilder, private http: HttpClient, private cookie : CookieService, public plantcodeService: PlantcodeService, private active : ActivatedRoute) {
        this.form = fb.group({
            sno: new UntypedFormControl(' '),
            account:['', Validators.required],
            ifsc:['', Validators.required],
            bankName:['', Validators.required],
            mobilenumber: new UntypedFormControl(this.active.snapshot.paramMap.get('mobile_no1'))
        })
    }

    ngOnInit(): void {
        this.plantcodeService.getbanknames()
        this.getdatabasic()
        setTimeout(() => {
            for(var i = 0; i<this.plantcodeService.banknames.length - 1; i++){
                this.banks[i] = this.plantcodeService.banknames[i]?.bank_name
    
                this.temp = this.banks[i]
                this.banks[i] = this.temp.trim()
            }

            this.bank = this.plantcodeService.basicdetails

            this.form.controls['account'].setValue(this.bank[0]?.bank_account_number)
            this.form.controls['ifsc'].setValue(this.bank[0]?.ifsc_code)
            this.form.controls['bankName'].setValue(this.bank[0]?.bank_name.trim())
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
        console.log("values : ",this.form.value);
        this.plantcodeService.submitbank()
    }
    sendData(){
        this.plantcodeService.bank = this.form.value
    }

    getdatabasic(){
        this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');
        console.log(this.uniqueId)
        this.plantcodeService.getdatabasic(this.uniqueId)

    }
    
}
