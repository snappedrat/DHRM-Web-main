import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, UntypedFormGroup, UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { AnyNaptrRecord } from 'dns';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { ActivatedRoute } from '@angular/router';
import { threadId } from 'worker_threads';
import { environment } from 'src/environments/environment.prod';

import {
    trigger,
    state,
    style,
    animate,
    transition,
  } from '@angular/animations';
  import { Timestamp } from 'rxjs';

  
@Component({
    selector: 'app-basic',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.css'],
    animations: [
        trigger('slowAnimate', [
          transition(':enter', [style({opacity: '0'}), animate(500)]),
          transition(':leave', [style({opacity: '1'}), animate(500, style({opacity: '0'}))]),
        ])
      ]
})
export class BasicComponent implements OnInit{

    @Output() emit = new EventEmitter<any>()
    message = {'basic':false}

    Title : any = ['Mr.', 'Miss.', 'Mrs.']
    Gender: any = ['Male', 'Female'];
    nation :any = ['India'];
    religion: any =['HINDU',
        'BUDDHIST',
        'ISLAM',
        'CHRISTIAN',
        'SIKH',
        'JAIN',
        'PARSI'];
    marital: any =['Married','unmarried','widower'];
    BloodGroup: any =['O+','O-','A+','A-','B+','B-','AB+','AB-'];
    physical:any=['No', 'Yes'];
    uniqueId :any = {'mobile':''}
    basic: any = []
    aadharsplitted :any = []
    vaccinated :any = false
    ishr:any = sessionStorage.getItem('ishr') 
    form: FormGroup = new FormGroup({});
    flag : any = 0
    flag_to_readonly: any = false
    state :any = false
    aadhar :any 
    aadhar_invalid:any = true
    aadhar4:any
    aadhar3:any
    aadhar2:any
    aadhar1:any
    pincodes:any
    pincode_ng:any
    apln_status: any;
    url = environment.path


    constructor(private fb: UntypedFormBuilder, private http: HttpClient , private cookie:CookieService, private plantcodeService: PlantcodeService, private active : ActivatedRoute) {
        this.form = fb.group({
            permanent: new FormControl('', Validators.required),
            present: new FormControl('', Validators.required),
            title: ['',Validators.required],
            fname:['',Validators.required],
            lname:['',Validators.required],
            ftname:['',Validators.required],
            bd:['',Validators.required],
            height:[''],
            weight:[''],
            vacc:[''],
            dd1:[''],
            dd2:[''],
            bg:['',Validators.required],
            gender:['',Validators.required],
            aadhar1:['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
            aadhar2:['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
            aadhar3:['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],

            nation:['',Validators.required],
            city:[''],
            st:[''],
            pc:['',[Validators.required,Validators.maxLength(6), Validators.pattern('[0-9][0-9][0-9][0-9][0-9][0-9]')]],
            reg:['',Validators.required],
            mar:['',Validators.required],
            pd:['',Validators.required],
            bp:['',Validators.required],
            idm1:[''],
            idm2:[''],
            mobilenumber : [this.active.snapshot.paramMap.get('mobile_no1')],
            company: [this.active.snapshot.paramMap.get('company')]
    })

    this.form.get('permanent')?.valueChanges.subscribe((value)=> this.form.get('present')?.setValue(value) )

   }

    ngOnInit(): void {

        this.getdatabasic()
        this.getaadhar()
        
        this.form.controls['vacc'].setValue('no')

    }

    getdatabasic(){
        this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');
        this.uniqueId.company = this.active.snapshot.paramMap.get('company');

        this.plantcodeService.getdatabasic(this.uniqueId)
      .subscribe({
        next: (response) => {console.log("basic : ",response); this.basic = response;

        this.apln_status = this.basic[0]?.apln_status 
        this.disable_for_hr()

        if(this.basic[0]?.title ==null)
            this.form.controls['pd'].setValue('No')

        this.form.controls['title'].setValue(this.basic[0]?.title)
        this.form.controls['fname'].setValue(this.basic[0]?.first_name)
        this.form.controls['lname'].setValue(this.basic[0]?.last_name)
        this.form.controls['ftname'].setValue(this.basic[0]?.fathername)
        this.form.controls['bd'].setValue(this.basic[0]?.birthdate)
        this.form.controls['permanent'].setValue(this.basic[0]?.permanent_address)
        this.form.controls['present'].setValue(this.basic[0]?.present_address)
        this.form.controls['nation'].setValue(this.basic[0]?.nationality)
        this.form.controls['height'].setValue(this.basic[0]?.height)
        this.form.controls['weight'].setValue(this.basic[0]?.weight)

        try
        {
        this.aadharsplitted = this.basic[0]?.aadhar_no.match(/.{1,4}/g)
        this.form.controls['aadhar1'].setValue(this.aadharsplitted[0])
        this.form.controls['aadhar2'].setValue(this.aadharsplitted[1])
        this.form.controls['aadhar3'].setValue(this.aadharsplitted[2])
        }
        catch(err)
        {}

        this.form.controls['pd'].setValue(this.basic[0]?.physical_disability)
        this.form.controls['mar'].setValue(this.basic[0]?.marital_status)
        this.form.controls['dd1'].setValue(this.basic[0]?.dose1_dt)
        this.form.controls['dd2'].setValue(this.basic[0]?.dose2_dt)
        this.form.controls['reg'].setValue(this.basic[0]?.religion)

        this.form.controls['pc'].setValue(this.basic[0]?.pincode)

        this.form.controls['city'].setValue(this.basic[0]?.city)
        this.form.controls['st'].setValue(this.basic[0]?.state_name)

        this.form.controls['bp'].setValue(this.basic[0]?.birth_place)
        this.form.controls['bg'].setValue(this.basic[0]?.blood_group)
        this.form.controls['gender'].setValue(this.basic[0]?.gender)
        this.form.controls['idm1'].setValue(this.basic[0]?.ident_mark1)
        this.form.controls['idm2'].setValue(this.basic[0]?.ident_mark2)
        this.form.get('nation')?.setValue('India')

        if(this.form.valid)
            this.emit.emit(this.message)

        this.sendData()
        } ,
        error: (error) => console.log(error),
      })
      }

    getaadhar(){
        this.http
        .get(this.url+'/getaadhar')
        .subscribe({
          next: (response) =>{ console.log(response); this.aadhar = response},
          error: (error) => console.log(error),
        })
    }

    check_aadhar(event:any, a:any)
    {
        if(!Number.isInteger(event))
        {
            this.form
        }

            if(event?.length == 4 )
            {
                var mobile = this.active.snapshot.paramMap.get('mobile_no1')
                var total = this.form.controls['aadhar1']?.value+this.form.controls['aadhar2']?.value+this.form.controls['aadhar3']?.value
                for(var i = 0 ; i< this.aadhar.length;i++)
                {
                    if(this.aadhar[i].aadhar_no == total && mobile == this.aadhar[i].mobile_no1)
                    {
                        this.aadhar_invalid = true
                    }
                    else if(this.aadhar[i].aadhar_no == total && mobile != this.aadhar[i].mobile_no1)
                    {
                        this.aadhar_invalid = false
                        this.form.controls['aadhar3'].setErrors({'incorrect':true})
                        console.log("aadhar check",this.form.controls['aadhar3'].valid)
                        break
                    }
                    else
                        this.aadhar_invalid = true

                }        
            }
    }

    emitData(){
        if(this.form.valid)
            this.emit.emit(this.message) 
        else
        {
            this.emit.emit({"basic":true})

        }
    }

    disable_for_hr()
    {
        if(this.ishr == 'true' && this.apln_status == 'NEW INCOMPLETE')
        {
            this.flag_to_readonly = false
        }
        else if(this.ishr == 'undefined' && this.apln_status == 'NEW INCOMPLETE')
        {
            this.flag_to_readonly = false
        }
        else
        {
            this.flag_to_readonly = true
        }
    }

    setcity_state(event:any)
    {
        if(event?.length == 6)
        {
            console.log(event.length)
            var pincode = {
                "pincode": event
            }
            this.plantcodeService.getpincode(pincode)
            .subscribe({
                next : (response)=>{console.log("pincode : ", response), this.pincodes = response;
                this.form.controls['st'].setValue(this.pincodes[0]?.statename)
                this.form.controls['city'].setValue(this.pincodes[0]?.dvisionname)},
                error : (err)=> console.log(err)
              })
        }

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

    validate(event:any)
    {
    var date = new Date()
    var year = date.getFullYear()

    if(year - event.target.value.split('-')[0] <=18)
        this.flag = 1
    else
        this.flag = 0
    }

    public inputValue:string ="";
    public check:boolean;
    public noEntry:boolean = true;

    public getValue(event:any):void
    {
        if(event.target.checked)
        {
            this.form.get('present')?.setValue(this.form.get('permanent')?.value)
            this.form.get('permanent')?.valueChanges.subscribe((value)=> this.form.get('present')?.setValue(value) )
        }
    }
    public noValue(event:any):void{
        if(event.target.checked)
        {
            this.form.get('present')?.setValue('')
        }
    }

    submit()
    {
            this.plantcodeService.submitbasic()
            this.sendData()
            this.state = true
            setTimeout(() => {
                this.state = false
            }, 2000);

    }

    sendData(){
        this.plantcodeService.basic = this.form.value
        if(this.form.valid)
            this.emit.emit(this.message)
        else
        {
            console.log(this.form.get('aadhar1')?.value)
            console.log(this.form.get('aadhar2')?.value)
            console.log(this.form.get('aadhar3')?.value)
            console.log(this.form.get('aadhar1')?.valid)
            console.log(this.form.get('aadhar2')?.valid)
            console.log(this.form.get('aadhar3')?.valid)
            this.emit.emit({'basic':true})

        }
    }

    move(fromtext:any,totext:any, event: any){

        var length = fromtext.value.length;
        var maxlength = fromtext.maxLength;
        if(length >= maxlength)
        {
            totext.focus();
        }
    }



}
