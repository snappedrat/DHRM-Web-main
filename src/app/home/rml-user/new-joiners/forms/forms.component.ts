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
  
  constructor(private formservice: PlantcodeService, private http: HttpClient, private router: Router, private active: ActivatedRoute ){
  }

  ngOnInit(): void {
    this.getlocal()

}

  allSave()
  {
    this.formservice.submitbank()
    console.log(this.formservice.bank)

    this.formservice.submitbasic()
    console.log(this.formservice.basic)

    // this.formservice.submitedu()
    // console.log(this.formservice.edu)

    this.formservice.submitemer()
    console.log(this.formservice.emer)    

    // this.formservice.submitfamily()
    // console.log(this.formservice.fam) 

    this.formservice.submitother()
    console.log(this.formservice.other) 

    // this.formservice.submitprev()
    // console.log(this.formservice.prev) 

    // this.formservice.sumbitlang()
    // console.log(this.formservice.lang) 
  }


  mainalert(){
    if(this.a == undefined){
      this.alert()
      this.router.navigate([''])
    }
    else{
      this.alertforapproval()
      this.router.navigate(['rml/new-joiners/forms'])
    }
  }
  alert()
  {
    window.alert("Your application has been submitted. \n Contact HR for more information")
  }
  alertforapproval()
  {
    window.alert("Trainee Form had been updated")
  }

  update_status(){
    this.http.post('http://localhost:3000/updatestatus','')
    .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
});
  }

  approved(data:any)
  {
      this.uniqueId.mobile = data

      console.log(this.uniqueId);

      this.http
      .post('http://localhost:3000/approved', this.uniqueId)
      .subscribe({
        next: (response) =>{ console.log(response);},
        error: (error) => console.log(error),
      })
  }

  rejected(data:any)
  {
    this.uniqueId.mobile = data

    console.log(this.uniqueId);

    this.http
    .post('http://localhost:3000/rejected', this.uniqueId)
    .subscribe({
      next: (response) =>{ console.log(response);},
      error: (error) => console.log(error),
    })
  }
  
  getlocal(){
    this.ishr = localStorage.getItem('ishr')
    this.ishrappr = localStorage.getItem('ishrappr')
    console.log('====================================');
    console.log(this.ishr);
    console.log(this.ishrappr);
    console.log('====================================');
  }

}
