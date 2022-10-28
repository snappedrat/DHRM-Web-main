import { Component, OnInit } from '@angular/core';
import { PlantcodeService } from '../plantcode.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  bankdata :any
  basicData: any
  eduData: any
  emerData: any
  famData: any
  otherData: any
  prevData: any
  a: any
  uniqueKey: any
  uniqueId :any = {'mobile':''}
  ishr: any
  ishrappr : any
  status: any = {'status': ''}
  basic: any
  submit:any
  apln_no:any = ''
  flag:any = true
  apln_status :any = ''
  flag_submit_all: any = this.formservice.flag_submit_all;
  message: any = true
  message_from_basic: any 
  message_from_bank: any 
  message_from_edu: any 
  message_from_choose: any 
  message_from_prev: any 
  message_from_emer: any 
  message_from_fam: any 
  message_from_lang: any 
  message_from_other:any


  constructor(private formservice: PlantcodeService, private http: HttpClient, private router: Router, private active: ActivatedRoute ){
  }

  ngOnInit(): void {
    this.getDataForID()
    
    this.ishr = sessionStorage.getItem('ishr')

    if(this.ishr == 'undefined')
    this.submit = 'SUBMIT'
    else
    this.submit = 'SEND FOR APPROVAL'

    setTimeout(() => {
      console.log("......................",this.formservice.basicdetails[0]?.apln_status);
      
      this.apln_status = this.formservice.basicdetails[0]?.apln_status
      console.log(this.apln_status != 'PENDING');
      
      if((this.apln_status == 'NEW INCOMPLETE' && this.submit == 'SUBMIT') || (this.apln_status == 'PENDING' && this.submit == 'SEND FOR APPROVAL') || (this.apln_status == 'REJECTED' && this.submit == 'SEND FOR APPROVAL'))
      {
        console.log("hahahahaahahahahaa bye bye")
        this.flag = true
      }
      else
      {
        console.log(" bye bye")
        this.flag = false
      }
   }, 1000);
}

  eventchanger_basic(data:any)
  {
    console.log(data)

    this.message_from_basic = data.basic

    if(this.message_from_bank == false && this.message_from_basic == false && this.message_from_edu == false&& this.message_from_fam == false && this.message_from_emer == false &&this.message_from_choose == false )
      this.message = false
    else
      this.message = true
  }
  eventchanger_bank(data:any)
  {
    console.log(data)

    this.message_from_bank = data.bank

    if(this.message_from_bank == false && this.message_from_basic == false && this.message_from_edu == false && this.message_from_fam == false && this.message_from_emer == false &&this.message_from_choose == false)
      this.message = false
    else
      this.message = true
  }
  eventchanger_edu(data:any)
  {
    console.log(data)

    this.message_from_edu = data.edu

    if(this.message_from_bank == false && this.message_from_basic == false && this.message_from_edu == false && this.message_from_fam == false && this.message_from_emer == false &&this.message_from_choose == false)
      this.message = false
    else
      this.message = true
  }

  eventchanger_choose(data:any)
  {
    console.log(data)

    this.message_from_choose = data.choose

    if(this.message_from_bank == false && this.message_from_basic == false && this.message_from_edu == false && this.message_from_fam == false && this.message_from_emer == false &&this.message_from_choose == false)
      this.message = false
    else
      this.message = true
  }
  eventchanger_fam(data:any)
  {
    console.log(data)
    this.message_from_fam = data.fam

    if(this.message_from_bank == false && this.message_from_basic == false && this.message_from_edu == false && this.message_from_fam == false && this.message_from_emer == false &&this.message_from_choose == false)
      this.message = false
    else
      this.message = true
  }
  eventchanger_emer(data:any)
  {
    console.log(data)
    this.message_from_emer = data.emer

    if(this.message_from_bank == false && this.message_from_basic == false && this.message_from_edu == false && this.message_from_fam == false && this.message_from_emer == false &&this.message_from_choose == false)
      this.message = false
    else
      this.message = true
  }
  
  allSave()
  {
    this.formservice.submitbank()
    console.log(this.formservice.bank)

    this.formservice.submitbasic()
    console.log(this.formservice.basic)

    this.formservice.submitedu()
    console.log(this.formservice.edu)

    this.formservice.submitemer()
    console.log(this.formservice.emer)    

    this.formservice.submitfamily()
    console.log(this.formservice.fam) 

    this.formservice.submitother()
    console.log(this.formservice.other) 

    this.formservice.submitprev()
    console.log(this.formservice.prev) 

    this.formservice.sumbitlang()
    console.log(this.formservice.lang) 

    

    this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1')
    this.formservice.getdatabasic(this.uniqueId)
    
    this.apln_no = this.formservice.basicdetails[0]?.apln_slno
    console.log("ishr :", this.ishr, "ishrappr :", this.ishrappr)
  
    this.submitted()

    setTimeout(() => {
      this.mainalert()
    }, 1000);

  }


  mainalert(){

    this.ishr = sessionStorage.getItem('ishr')

    if(this.ishr == 'undefined'){
      this.alert()
      this.router.navigate([''])
    }
    else if(this.ishr == 'true'){
      this.alertforapproval()
      this.router.navigate(['rml/new_joiners/trainee-application-status'])
    }
  }

  

  alert()
  {
    window.alert("Your application "+this.apln_no+" has been submitted. \n Contact HR for more information")
  }
  alertforapproval()
  {
    window.alert("Trainee Form "+this.apln_no+" had been updated")
  }

  submitted()
  {
      this.ishr = sessionStorage.getItem('ishr')

      this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');

      console.log(this.uniqueId);
      if(this.ishr == 'true' )
      {
        this.formservice.submitted(this.uniqueId)
    }
      else if(this.ishr == 'undefined')
      {
        this.formservice.pending(this.uniqueId)
      }
  }

  getDataForID(){
    this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');
    this.status.status = this.active.snapshot.paramMap.get('apln_status');
      
    console.log(this.status)

  }


  

}
