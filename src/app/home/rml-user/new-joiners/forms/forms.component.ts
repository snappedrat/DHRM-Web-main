import { Component, OnInit } from '@angular/core';
import { PlantcodeService } from '../plantcode.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { isThisSecond } from 'date-fns';

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

  constructor(private formservice: PlantcodeService, private http: HttpClient, private router: Router, private active: ActivatedRoute ){
  }

  ngOnInit(): void {
    this.getDataForID()

    this.ishr = sessionStorage.getItem('ishr')

    if(this.ishr == 'undefined')
    this.submit = 'SUBMIT'
      else
    this.submit = 'SEND FOR APPROVAL'
    
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
    this.mainalert()
    this.submitted()
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

  approved()
  {
      this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');

      console.log(this.uniqueId);

      this.formservice.approved(this.uniqueId)
  }

  rejected()
  {
    this.formservice.rejected()
  }

  getDataForID(){
    this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');
    this.status.status = this.active.snapshot.paramMap.get('apln_status');
      
    console.log(this.status)

  }


  

}
