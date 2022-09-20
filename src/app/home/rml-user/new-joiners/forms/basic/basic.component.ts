import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, UntypedFormGroup, UntypedFormBuilder} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { AnyNaptrRecord } from 'dns';
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
    constructor(private fb: UntypedFormBuilder, private http: HttpClient) {
        this.form = fb.group({
            mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            permanent:['',Validators.required],
            present: ['', Validators.required],
            name:['',Validators.required],
            fname:['',Validators.required],
            bd:['',Validators.required],
            height:['',Validators.required],
            checkbox:['',Validators.required],
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
        })
    }

    get f(){
        return this.form.controls;
    }
    get p(){
        return this.form.controls;
    }
    get name(){
        return this.form.controls;
    }
    get fname()
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
        console.log(this.form.value);
        let formData: any = new FormData();
        formData.append('mobileNumber', this.form.get('mobileNumber')!.value);
        formData.append('permanent', this.form.get('permanent')!.value);
        formData.append('present', this.form.get('present')!.value);
        formData.append('name', this.form.get('name')!.value);
        formData.append('fname', this.form.get('fname')!.value);
        formData.append('bd', this.form.get('bd')!.value);
        formData.append('height', this.form.get('height')!.value);
        formData.append('checkbox', this.form.get('checkbox')!.value);
        formData.append('weight', this.form.get('weight')!.value);
        formData.append('dd1', this.form.get('dd1')!.value);
        formData.append('dd2', this.form.get('dd2')!.value);
        formData.append('gender', this.form.get('gender')!.value);
        formData.append('aadhar1', this.form.get('aadhar1')!.value);
        formData.append('nation', this.form.get('nation')!.value);
        formData.append('reg', this.form.get('reg')!.value);
        formData.append('mar', this.form.get('mar')!.value);
        formData.append('pd', this.form.get('pd')!.value);
        this.http
            .post('http://localhost:3000/basicforms', this.form.value)
            .subscribe({
                next: (response) => console.log(response),
                error: (error) => console.log(error),
            });
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
