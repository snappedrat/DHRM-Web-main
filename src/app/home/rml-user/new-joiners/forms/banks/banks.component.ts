import {
    animate,
    style,
    transition,
    trigger
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormService } from '../../form.service';


@Component({
    selector: 'app-banks',
    templateUrl: './banks.component.html',
    styleUrls: ['./banks.component.css'],
    animations: [
        trigger('slowAnimate', [
          transition(':enter', [style({opacity: '0'}), animate(500)]),
          transition(':leave', [style({opacity: '1'}), animate(500, style({opacity: '0'}))]),
        ])
      ]
})
export class BanksComponent implements OnInit{
    @Input() bank:any = []
    @Output() emit = new EventEmitter<any> ();
    message : any = {'bank':false};

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

uniqueId :any = {'mobile':'', 'company': ''}
// bank : any = []
banknames :any = []
banks:any = []
temp: string = 'hellllllllllll'

flagger : any = false

    form: UntypedFormGroup;
    sno: any;
    state: boolean;
    constructor(private fb: UntypedFormBuilder, private http: HttpClient, private cookie : CookieService, public formservice: FormService, private active : ActivatedRoute) {
        this.form = fb.group({
            sno: new UntypedFormControl(' '),
            account:['', Validators.required],
            ifsc:['', Validators.required],
            bankName:['', Validators.required],
            mobilenumber: new UntypedFormControl(this.active.snapshot.paramMap.get('mobile_no1')),
            company : [this.active.snapshot.paramMap.get('company')]
        })
    }

    ngOnInit(): void {
        this.formservice.getbanknames()
        .subscribe({
            next : (response)=>
            {
                console.log("banknames", response);
                this.banknames = response;
                this.banknames = this.banknames.map((a:any)=>a.bank_name)
            },
            error : (err)=> console.log(err)
        })

        this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');
        this.uniqueId.company = this.active.snapshot.paramMap.get('company');

        this.form.controls['account'].setValue(this.bank[0]?.bank_account_number == 'null' ? null : this.bank[0]?.bank_account_number)
        this.form.controls['ifsc'].setValue(this.bank[0]?.ifsc_code == 'null' ? null : this.bank[0]?.ifsc_code)
        this.form.controls['bankName'].setValue(this.bank[0]?.bank_name == 'null' ? null : this.bank[0]?.bank_name)
        this.sendData()
        if(this.form.valid)
            this.emit.emit(this.message)


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
        this.formservice.submitbank()
        this.state = true
        setTimeout(() => {
            this.state = false
        }, 2000);
        
    }
    sendData(){
        this.formservice.bank = this.form.value
        this.emitData()
    }

    emitData()
    {
        if(this.form.valid)
        this.emit.emit(this.message)
        else
        this.emit.emit({"bank":true})
    }

}
