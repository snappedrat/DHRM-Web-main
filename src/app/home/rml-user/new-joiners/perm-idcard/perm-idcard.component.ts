import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from 'src/app/home/api.service';

@Component({
  selector: 'app-perm-idcard',
  templateUrl: './perm-idcard.component.html',
  styleUrls: ['./perm-idcard.component.css']
})
export class PermIdcardComponent implements OnInit {

  uniqueId :any = {'mobile':''}
  status: any = {'status': ''}
  apln_no:any= {'apln_no':''}
  formvalues: any
  address:any  = 'hello'
  form:any
  url: any = environment.path
  url2: any = this.url
  fromdate:any
  frommdate:any
  toodate:any
  todate:any
  plant: any;
  cat: any;
  validdate:any
  // todate = this.fromdate.setDate(this.fromdate.getDate() + 10)

    constructor(private active: ActivatedRoute, private http: HttpClient,private fb: UntypedFormBuilder, private service: ApiService ) { 
        this.form = fb.group(
          {
            permanent:[],
            company_address : []
          }
        )
        this.cat = this.active.snapshot.paramMap.get('cat')
        this.service.getValidDate({cat: this.cat})
        .subscribe(
            (data:any)=>
            {
              this.validdate = data[0].sap_p2; 
              console.log(this.validdate);
              if(this.validdate == null || this.validdate == undefined)
                this.validdate = 1
              else
                this.validdate = this.validdate/12

              this.fromdate = new Date()

              this.todate = new Date(this.fromdate.getTime() + ((365000*this.validdate) * 60 * 60 * 24));
              
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
            }
        )
    }

  ngOnInit(): void {
    this.getDataForID()
  }


  printing(){
    window.focus()
    window.print()
    window.close()
  }

  
  getDataForID(){
    this.uniqueId.trainee_apln = this.active.snapshot.paramMap.get('trainee_apln');
    this.uniqueId.apln_slno = this.active.snapshot.paramMap.get('apln_slno');
    this.uniqueId.status = this.active.snapshot.paramMap.get('status');
    console.log(this.status)

    this.service.getDataForPermId(this.uniqueId)
    .subscribe({
      next:(response:any)=>
      {
        console.log(response); 
        this.formvalues = response;

        if(this.formvalues)
        {
          setTimeout(() => {
            this.printing()      
          }, 1000);
        }

        this.plant = this.formvalues[0].plant_sign
        this.form.controls['permanent'].setValue(this.formvalues[0]?.permanent_address)
        this.form.controls['company_address'].setValue(this.formvalues[0]?.addr)

        this.url = this.url+'/uploads/' + this.formvalues[0]?.other_files6
        this.plant = environment.path+'/plant/' + this.formvalues[0]?.plant_sign

        console.log("url",this.plant, this.url)
      },
      error: (error) => 
      console.log(error),
    })
    
  }
}
