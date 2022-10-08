import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, UntypedFormGroup, UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { AnyNaptrRecord } from 'dns';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-basic',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit{
    Gender: any = ['Men', 'Women'];
    nation :any = ['India'];
    State: any =['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telengana','Tripura','Uttarakhand','Uttar Pradesh','West Bengal'];
    religion: any =['Hindu','christain','muslim'];
    marital: any =['Married','unmarried','widower'];
    BloodGroup: any =['O+','O-','A+','A-','B+','B-','AB+','AB-'];
    physical:any=['Yes','No'];
    uniqueId :any = {'mobile':''}
    basic: any = []

    // sample: any = {
    //     "name" : "ahamed",
    //     "father": "Nisar"
    // }

    form: FormGroup = new FormGroup({});
    constructor(private fb: UntypedFormBuilder, private http: HttpClient , private cookie:CookieService, private plantcodeService: PlantcodeService, private active : ActivatedRoute) {
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
            bg:['',Validators.required],
            gender:['',Validators.required],
            aadhar1:['', Validators.required],
            aadhar2:['', Validators.required],
            aadhar3:['', Validators.required],
            aadhar4:['', Validators.required],
            nation:['',Validators.required],
            city:['',Validators.required],
            st:['',Validators.required],
            pc:['',Validators.required],
            reg:['',Validators.required],
            mar:['',Validators.required],
            pd:['',Validators.required],
            bp:['',Validators.required],
            idm1:[''],
            idm2:[''],
            mobilenumber : new UntypedFormControl(this.active.snapshot.paramMap.get('mobile_no1'))
        })
   }

    ngOnInit(): void {

        this.getdatabasic()
        
        setTimeout(() => {
            this.form.controls['fname'].setValue(this.basic[0]?.fullname)
            this.form.controls['lname'].setValue(this.basic[0]?.fullname)
            this.form.controls['ftname'].setValue(this.basic[0]?.fathername)
            this.form.controls['bd'].setValue(this.basic[0]?.birthdate)
            this.form.controls['permanent'].setValue(this.basic[0]?.permanent_address)
            this.form.controls['present'].setValue(this.basic[0]?.present_address)
            this.form.controls['nation'].setValue(this.basic[0]?.nationality)
            this.form.controls['height'].setValue(this.basic[0]?.height)
            this.form.controls['weight'].setValue(this.basic[0]?.weight)
            this.form.controls['pd'].setValue(this.basic[0]?.physical_disability)
            this.form.controls['mar'].setValue(this.basic[0]?.marital_status)
            this.form.controls['dd1'].setValue(this.basic[0]?.dose1_dt)
            this.form.controls['dd2'].setValue(this.basic[0]?.dose2_dt)
            this.form.controls['reg'].setValue(this.basic[0]?.religion)
            this.form.controls['st'].setValue(this.basic[0]?.state_name)
            this.form.controls['pc'].setValue(this.basic[0]?.pincode)
            this.form.controls['city'].setValue(this.basic[0]?.city)
            this.form.controls['bp'].setValue(this.basic[0]?.birth_place)
            this.form.controls['idm1'].setValue(this.basic[0]?.ident_mark1)
            this.form.controls['idm2'].setValue(this.basic[0]?.ident_mark2)


            this.sendData()
        }, 1000);
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
    get bg()
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
    get city()
    {
        return this.form.controls;
    }
    get pc()
    {
        return this.form.controls;
    }
    get st()
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
    get bp()
    {
        return this.form.controls;
    }
    get idm1()
    {
        return this.form.controls;
    }
    get idm2()
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

    getdatabasic(){
        this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');
        console.log('====================================');
        console.log(this.uniqueId);
        console.log('====================================');
        this.http.
      post('http://localhost:3000/getdatabasic',this.uniqueId)
      .subscribe({
        next: (response) => {console.log("basic : ",response); this.basic = response} ,
        error: (error) => console.log(error),
      })
      }

}
