import { Injectable } from '@angular/core';
import { User } from '../masters/user/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BanksComponent } from './forms/banks/banks.component';
import { BasicComponent } from './forms/basic/basic.component';
import { LanguageComponent } from './forms/language/language.component';
import { OtherComponent } from './forms/other/other.component';
import { EmergencyComponent } from './forms/emergency/emergency.component';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PlantcodeService {
  bank: any;
  basic : any;
  edu : any;
  emer : any;
  fam : any;
  lang : any;
  other : any;
  prev : any;
  idforfilename:any
  filterinfo:any
  searchfilterinfo:any

  basicdetails :any = []
  education:any = []
  family:any = []
  career:any = []
  url = environment.path
  uniqueId: any
  filenames: any;
  ishr:any = []
  ishrappr:any = []
  banknames: any = []
  pincodes :any
  flag_submit_all: any = true

  constructor(private http : HttpClient, private active : ActivatedRoute)
  {
   }

validate_All()
{
  this.flag_submit_all = false
}

submitbank(){
  console.log(this.bank)
  this.http
  .post(this.url+'/bankforms', this.bank)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitbasic(){
  console.log(this.basic)
  this.http
  .post(this.url+'/basicforms', this.basic)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitedu(){
  console.log(this.edu)
  this.http
  .post(this.url+'/edu', this.edu)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}


submitemer(){
  
  console.log(this.edu)
  this.http
  .post(this.url+'/emergency', this.emer)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitfamily(){
  console.log(this.edu)
  this.http
  .post(this.url+'/family', this.fam)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitother(){
  console.log(this.other)
  this.http
  .post(this.url+'/others', this.other)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitprev(){
  console.log(this.prev)
  this.http
  .post(this.url+'/prev', this.prev)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

sumbitlang(){
        this.http.
    post(this.url+'/lang', this.lang)
    .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
  })
}

getdatabasic(uniqueId:any){
  return this.http.
post(this.url+'/getdatabasic',uniqueId)

}

getdataqualifn(uniqueId:any){
  // this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  return this.http.
post(this.url+'/getdataqualfn',uniqueId)

}

getdatafamily(uniqueId:any){
  // this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  return this.http.
post(this.url+'/getdatafamily',uniqueId)

}

getdatacareer(uniqueId:any){
  // this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  return this.http.
post(this.url+'/getdatacareer',uniqueId)

}

fileupload(file:any,uniqueId:any,company:any, id_no :any, fileno:any){

  const formData = new FormData()
  var changedname = id_no
  var name = file.name
  name = name.split('.')
  var len = name.length

  formData.append("file",file, changedname +'.'+ file.name.split('.')[len-1] )
  formData.append("mobile",uniqueId)
  formData.append("company", company)
  formData.append("fileno",fileno)

    this.http.
    post(this.url+'/image', formData).subscribe({
      next: (res)=> {console.log(res);},
      error: (err)=>console.log(err)
    })

}

submitted(uniqueId: any){
  console.log("----------------------------", uniqueId)
  this.http
  .post(this.url+'/submitted',uniqueId)
  .subscribe({
    next: (response) =>{ console.log(response);},
    error: (error) => console.log(error),
  })
}

pending(uniqueId: any){
  this.http
  .post(this.url+'/pending',uniqueId)
  .subscribe({
    next: (response) =>{ console.log(response);},
    error: (error) => console.log(error),
  })
}

approved(uniqueId:any){

  this.http
  .post(this.url+'/approved', uniqueId)
  .subscribe({
    next: (response) =>{ console.log(response);},
    error: (error) => console.log(error),
  })
}

rejected(uniqueId:any){
  console.log(this.uniqueId);

  this.http
  .post(this.url+'/rejected', uniqueId)
  .subscribe({
    next: (response) =>{ console.log(response);},
    error: (error) => console.log(error),
  })
}

getHr(uniqueid: any)
{

  return this.http.post(this.url+'/gethrappr',uniqueid)

}

filter(formvalue:any)
{
  return this.http
  .post(this.url+'/filter', formvalue)

}

searchfilter(form:any)
{
  return this.http
  .post(this.url+'/searchfilter', form)

}
getbanknames()
{
    return this.http
    .get(this.url+'/getbanknames')
}

getpincode(pincode:any)
{
    return  this.http
    .post(this.url+'/getpincode',pincode)
}

}
