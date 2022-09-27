import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, UntypedFormGroup, UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { AnyNaptrRecord } from 'dns';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
@Component({
    selector: 'app-basic',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.css']
})
export class BasicComponent {
    Gender: any = ['Men', 'Women'];
    nation :any = ['India'];
    religion: any =['Hindu','christain','muslim'];
    marital: any =['Married','unmarried','widower'];
    physical:any=['Yes','No'];
    form: FormGroup = new FormGroup({});
    constructor(private fb: UntypedFormBuilder, private http: HttpClient , private cookie:CookieService, private plantcodeService: PlantcodeService) {
        this.form = fb.group({
            mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            permanent:['',Validators.required],
            present: ['', Validators.required],
            title:['',Validators.required],
            name:['',Validators.required],
            fname:['',Validators.required],
            lname:['',Validators.required],
            ftname:['',Validators.required],
            bd:['',Validators.required],
            height:['',Validators.required],
            weight:['',Validators.required],
            dd1:['',Validators.required],
            dd2:['',Validators.required],
            gender:['',Validators.required],
            aadhar1:['', Validators.required],
            aadhar2:['', Validators.required],
            aadhar3:['', Validators.required],
            aadhar4:['', Validators.required],
            nation:['',Validators.required],
            reg:['',Validators.required],
            mar:['',Validators.required],
            pd:['',Validators.required],
            mobilenumber : new UntypedFormControl(this.cookie.get('mobilenum'))
        })
    }

    get f(){
        return this.form.controls;
    }
    get p(){
        return this.form.controls;
    }
    get title(){
        return this.form.controls;
    }
    get name(){
        return this.form.controls;
    }
    get fname()
    {
        return this.form.controls;
    }
    get ftname()
    {
        return this.form.controls;
    }
    get lname()
    {
        return this.form.controls;
    }
    get bd()
    {
        return this.form.controls;
    }
    get height()
    {
        return this.form.controls;
    }
    get weight()
    {
        return this.form.controls;
    }
    get dd1()
    {
        return this.form.controls;
    }
    get dd2()
    {
        return this.form.controls;
    }
    get gender()
    {
        return this.form.controls;
    }
    get Nation()
    {
        return this.form.controls;
    }
    get reg()
    {
        return this.form.controls;
    }
    get mar()
    {
        return this.form.controls;
    }
    get pd()
    {
        return this.form.controls;
    }
    public inputValue:string ="";
    public check:boolean;
    public noEntry:boolean = true;
    public getValue(event:any):void{
        if(event.target.checked)
        {

            this.inputValue=this.form.controls['permanent'].value;
            this.check =true;
            this.noEntry=true;
        }
    }
    public getVal(event:any):void{
        if(this.noEntry)
        {
            this.inputValue=this.form.controls['permanent'].value;
            this.check =true;

        }
    }
    public noValue(event:any):void{
        if(event.target.checked)
        {
            this.inputValue='';
            this.check=false;
            this.noEntry=false;
        }
    }
    submit(){
            this.plantcodeService.submitbasic()

    }
    sendData(){
        console.log(this.form.value);
        this.plantcodeService.basic = this.form.value
    }

    move(fromtext:any,totext:any){
        var length = fromtext.value.length;
        var maxlength = fromtext.maxLength;
        if(length == maxlength)
        {
            totext.focus();
        }
    }
}
