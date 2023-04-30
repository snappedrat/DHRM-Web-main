import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from 'src/app/home/api.service';

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
  plant: any;
  // todate = this.fromdate.setDate(this.fromdate.getDate() + 10)

    constructor(private active: ActivatedRoute, private http: HttpClient,private fb: UntypedFormBuilder, private service : ApiService ) { 
        this.form = fb.group(
          {
            permanent:[],
            company_address : []
          }
        )
        var x = this.fromdate.getMonth()+1
        var y = this.todate.getMonth()+1

        if(x<10)
        this.frommdate = this.fromdate.getDate()+'-0'+x+'-'+this.fromdate.getFullYear()
        else
        this.frommdate = this.fromdate.getDate()+'-'+x+'-'+this.fromdate.getFullYear()

        if(y<10)
        this.toodate = this.todate.getDate()+'-0'+y+'-'+this.todate.getFullYear()
        else
        this.toodate = this.todate.getDate()+'-'+y+'-'+this.todate.getFullYear()



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

    this.service.getDataForId(this.uniqueId)
    .subscribe({
      next:(response)=>
      {
        console.log(response); 
        this.formvalues = response

        this.plant = this.formvalues[0].plant_sign
        this.form.controls['permanent'].setValue(this.formvalues[0]?.permanent_address)
        this.form.controls['company_address'].setValue(this.formvalues[0]?.addr)

        this.url = this.url+'/uploads/' + this.formvalues[0]?.other_files6
        this.plant = environment.path+'/plant/' + this.formvalues[0]?.plant_sign
      },
      error: (error) => 
      console.log(error),
    })
    
  }
}
