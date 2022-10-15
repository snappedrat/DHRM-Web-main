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
    aadharsplitted :any = []
    vaccinated :any = false
    ishr:any = localStorage.getItem('ishr') 
    form: FormGroup = new FormGroup({});
    flag : any = 0

    constructor(private fb: UntypedFormBuilder, private http: HttpClient , private cookie:CookieService, private plantcodeService: PlantcodeService, private active : ActivatedRoute) {
        this.form = fb.group({
            permanent:['',Validators.required],
            present: ['', Validators.required],
            title:['',Validators.required],
            name:['',Validators.required],
            fname:['',Validators.required],
            lname:['',Validators.required],
            ftname:['',Validators.required],
            bd:['',Validators.required],
            height:[''],
            weight:[''],
            vacc:[''],
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
            mobilenumber : [this.active.snapshot.paramMap.get('mobile_no1')]
    })
   }

    ngOnInit(): void {
            this.setbdvalidation();
        this.getdatabasic()
        this.form.controls['vacc'].setValue('no')
        setTimeout(() => {

            this.basic = this.plantcodeService.basicdetails

            this.form.controls['fname'].setValue(this.basic[0]?.first_name)
            this.form.controls['lname'].setValue(this.basic[0]?.last_name)
            this.form.controls['ftname'].setValue(this.basic[0]?.fathername)
            this.form.controls['bd'].setValue(this.basic[0]?.birthdate)
            this.form.controls['permanent'].setValue(this.basic[0]?.permanent_address)
            this.form.controls['present'].setValue(this.basic[0]?.present_address)
            this.form.controls['nation'].setValue(this.basic[0]?.nationality)
            this.form.controls['height'].setValue(this.basic[0]?.height)
            this.form.controls['weight'].setValue(this.basic[0]?.weight)

            this.aadharsplitted = this.basic[0]?.aadhar_no.match(/.{1,4}/g)
            this.form.controls['aadhar1'].setValue(this.aadharsplitted[0])
            this.form.controls['aadhar2'].setValue(this.aadharsplitted[1])
            this.form.controls['aadhar3'].setValue(this.aadharsplitted[2])
            this.form.controls['aadhar4'].setValue(this.aadharsplitted[3])

            this.form.controls['pd'].setValue(this.basic[0]?.physical_disability)
            this.form.controls['mar'].setValue(this.basic[0]?.marital_status)
            this.form.controls['dd1'].setValue(this.basic[0]?.dose1_dt)
            this.form.controls['dd2'].setValue(this.basic[0]?.dose2_dt)
            this.form.controls['reg'].setValue(this.basic[0]?.religion)
            this.form.controls['st'].setValue(this.basic[0]?.state_name)
            this.form.controls['pc'].setValue(this.basic[0]?.pincode)
            this.form.controls['city'].setValue(this.basic[0]?.city)
            this.form.controls['bp'].setValue(this.basic[0]?.birth_place)
            this.form.controls['bg'].setValue(this.basic[0]?.blood_group)
            this.form.controls['gender'].setValue(this.basic[0]?.gender)
            this.form.controls['idm1'].setValue(this.basic[0]?.ident_mark1)
            this.form.controls['idm2'].setValue(this.basic[0]?.ident_mark2)


            this.sendData()
        }, 1000);
    }

    hide_vacc(event:any){
        if(event.target.value == 'yes')
            this.vaccinated = true
        if(event.target.value == 'no')
            this.vaccinated = false
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

    validate(event:any){
     var date = new Date()
    var year = date.getFullYear()
    console.log(year - event.target.value.split('-')[0])
    if(year - event.target.value.split('-')[0] <=18)
        this.flag = 1
    else
        this.flag = 0
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
    setbdvalidation(){
    const now = new Date();
    const birthday = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
    console.log(this.setbdvalidation)
    }
    submit(){
            this.plantcodeService.submitbasic()
            this.sendData()

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

        this.plantcodeService.getdatabasic(this.uniqueId)

    //     console.log('====================================');
    //     console.log(this.uniqueId);
    //     console.log('====================================');
    //     this.http.
    //   post('http://localhost:3000/getdatabasic',this.uniqueId)
    //   .subscribe({
    //     next: (response) => {console.log("basic : ",response); this.basic = response} ,
    //     error: (error) => console.log(error),
    //   })
      }

}
