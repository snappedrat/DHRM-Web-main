import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';

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
  url: any = ' http://localhost:3000/'
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
    }, 1000);

  }

  printing(){
    window.focus()
    window.print()
    window.close()
  }

  
  getDataForID(){
    this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
    this.status.status = this.active.snapshot.paramMap.get('status');
    
    console.log(this.status)

    this.http
    .post(' http://localhost:3000/getdataforid', this.uniqueId)
    .subscribe({
      next:(response)=>{console.log(response); this.formvalues = response},
      error: (error) => 
      console.log(error),
    })

    setTimeout(() => {
      this.form.controls['permanent'].setValue(this.formvalues[0]?.permanent_address)
      this.form.controls['company_address'].setValue(this.formvalues[0]?.addr)

      this.url = this.url + this.formvalues[0]?.other_files7
      console.log(this.url)
    }, 500);
    
  }
}
