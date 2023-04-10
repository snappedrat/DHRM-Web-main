import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { threadId } from 'worker_threads';
import { FormService } from '../form.service';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from 'src/app/home/api.service';


@Component({
  selector: 'app-hr-view-data',
  templateUrl: './hr-view-data.component.html',
  styleUrls: ['./hr-view-data.component.css']
})
export class HrViewDataComponent implements OnInit {

  var1: any = 'NULLL'
  uniqueId :any = {'mobile':''}
  basic : any
  career: any
  education: any
  family: any
  url:any = environment.path
  flag: any = false

	urlforResume: any 
	urlforMark: any
	urlforTc: any
	urlforaadhar: any
	urlforbankpass: any
	urlforphoto: any
	urlforSign: any
  tick :any = '✔️'
  ex:any = ''
  is_vaccinated: any

  url_appointmentorder_file: any
	url_declaration_file: any
	url_medicalfitness_file:any
	url_formA4_file:any
	url_form11_file:any
	url_formh2_file: any
	url_natx_file: any
  apln_status: any;

  constructor(private http: HttpClient, private active : ActivatedRoute, private router: Router, private service : FormService, private apiservice: ApiService) {

   }

  ngOnInit(): void {
    this.getdatabasic()
    this.getdataqualifn()
    this.getdatacareer()
    this.getdatafamily()
  

    console.log("......................................................................................")
    setTimeout(() => {

      console.log(this.basic[0]?.apln_status )
      if(this.basic[0]?.apln_status == 'SUBMITTED')
        this.flag = true

      if(this.basic[0]?.any_empl_rane == 'Y')
      this.basic[0].any_empl_rane = 'Yes'
      else if(this.basic[0]?.any_empl_rane == 'N')
      this.basic[0].any_empl_rane = 'No'
  
      if(this.basic[0]?.prev_rane_empl == 'Y')
      this.basic[0].prev_rane_empl = 'Yes'
      else if(this.basic[0]?.prev_rane_empl == 'N')
      this.basic[0].prev_rane_empl = 'No'
      var dt = this.basic[0]?.dose1_dt
      var dt2 = this.basic[0]?.dose2_dt
      if(dt?.includes('-'))
        this.is_vaccinated = 'YES'
      else if(dt==null && dt2 == null)
      this.is_vaccinated = 'NO'
      else if(dt == 'null' && dt2 == 'null' )
      this.is_vaccinated = 'NO'
      else
      this.is_vaccinated = 'YES'

      this.url_appointmentorder_file = this.url+this.basic[0].other_files8
      this.url_declaration_file = this.url+this.basic[0].other_files9
      this.url_medicalfitness_file = this.url+this.basic[0].other_files10 
      this.url_formA4_file = this.url+this.basic[0].other_files11
      this.url_form11_file = this.url+this.basic[0].other_files12 
      this.url_formh2_file = this.url+this.basic[0].other_files13
      this.url_natx_file = this.url+this.basic[0].other_files14

      this.urlforResume = this.url+'/'+this.basic[0].other_files1
      this.urlforMark = this.url+'/'+this.basic[0].other_files2
      this.urlforTc = this.url+'/'+this.basic[0].other_files3
      this.urlforaadhar = this.url+'/'+this.basic[0].other_files4 
      this.urlforbankpass = this.url+'/'+this.basic[0].other_files5
      this.urlforphoto = this.url+'/'+this.basic[0].other_files6
      this.urlforSign = this.url+'/'+this.basic[0].other_files7


      console.log(this.urlforResume)

    }, 1000);

  }

  approved()
  {
      this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
      this.uniqueId.company = this.active.snapshot.paramMap.get('company')
      this.service.approved(this.uniqueId)

      this.apiservice.approved_mail({plant_code: sessionStorage.getItem('plant_code'), mobile: this.uniqueId.mobile, company: this.uniqueId.company })
      .subscribe(
        {
          next: (response:any)=>{console.log(response)}
        }
      )
       window.alert("Application has been approved")
      this.router.navigate(['rml/new_joiners/hr-approval'])

  }

  rejected()
  {
    this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
    this.uniqueId.company = this.active.snapshot.paramMap.get('company')

    this.service.rejected(this.uniqueId)

    window.alert("Application has been rejected")
    this.router.navigate(['rml/new_joiners/hr-approval'])
  }


getdatabasic(){
  this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  this.uniqueId.company = this.active.snapshot.paramMap.get('company')

  this.service.getdatabasic(this.uniqueId)
.subscribe({
  next: (response) => {console.log("basic",response); this.basic = response; this.apln_status = this.basic[0]?.apln_status} ,
  error: (error) => console.log(error),
})
}

getdataqualifn(){
  this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  this.uniqueId.company = this.active.snapshot.paramMap.get('company')

  this.service.getdataqualifn(this.uniqueId)
.subscribe({
  next: (response) => {console.log("qual",response); this.education = response} ,
  error: (error) => console.log(error),
})
}


getdatafamily(){
  this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  this.uniqueId.company = this.active.snapshot.paramMap.get('company')

  this.service.getdatafamily(this.uniqueId)
.subscribe({
  next: (response) => {console.log("fam",response); this.family = response} ,
  error: (error) => console.log(error),
})
}

getdatacareer(){
  this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  this.uniqueId.company = this.active.snapshot.paramMap.get('company')

  this.service.getdatacareer(this.uniqueId)
.subscribe({
  next: (response) => {console.log("career",response); this.career = response} ,
  error: (error) => console.log(error),
})
}
}
