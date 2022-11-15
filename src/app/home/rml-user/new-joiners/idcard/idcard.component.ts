import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-idcard',
  templateUrl: './idcard.component.html',
  styleUrls: ['./idcard.component.css']
})

export class IdcardComponent implements OnInit {

  uniqueId :any = {'mobile':''}
  status: any = {'status': ''}
  formvalues: any
  address:any  = 'hello'
  form:any
  url: any = environment.path
  fromdate:any = new Date()
  frommdate:any
  toodate:any
  todate = new Date(this.fromdate.getTime() + (10000 * 60 * 60 * 24));
  // todate = this.fromdate.setDate(this.fromdate.getDate() + 10)

    constructor(private active: ActivatedRoute, private http: HttpClient,private fb: UntypedFormBuilder ) { 
        this.form = fb.group(
          {
            permanent:[],
            company_address : []
          }
        )
      this.frommdate = this.fromdate.getDate()+'-'+this.fromdate.getMonth()+'-'+this.fromdate.getFullYear()
    this.toodate = this.todate.getDate()+'-'+this.todate.getMonth()+'-'+this.todate.getFullYear()

    console.log(this.toodate)

    }

  ngOnInit(): void {
    this.getDataForID()
    setTimeout(() => {
      this.printing()
    }, 1500);

  }

  printing(){
    window.focus()
    window.print()
    window.close()
  }

  
  getDataForID(){
    this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
    this.uniqueId.company = this.active.snapshot.paramMap.get('company');

    this.status.status = this.active.snapshot.paramMap.get('status');
    
    console.log(this.status)

    this.http
    .post(this.url+'/getdataforid', this.uniqueId)
    .subscribe({
      next:(response)=>{console.log(response); this.formvalues = response
        this.form.controls['permanent'].setValue(this.formvalues[0]?.permanent_address)
        this.form.controls['company_address'].setValue(this.formvalues[0]?.addr)

        this.url = this.url + this.formvalues[0]?.other_files6
        console.log("url",this.url)
      },
      error: (error) => 
      console.log(error),
    })

    setTimeout(() => {

    }, 500);
    
  }
}
