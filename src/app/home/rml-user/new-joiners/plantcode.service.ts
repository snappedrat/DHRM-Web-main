import { Injectable } from '@angular/core';
import { User } from '../masters/user/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BanksComponent } from './forms/banks/banks.component';
import { BasicComponent } from './forms/basic/basic.component';
import { EducationalComponent } from './forms/educational/educational.component';
import { FamilyDetailComponent } from './forms/family-detail/family-detail.component';
import { LanguageComponent } from './forms/language/language.component';
import { OtherComponent } from './forms/other/other.component';
import { PrevComponent } from './forms/prev/prev.component';
import { EmergencyComponent } from './forms/emergency/emergency.component';
import { ActivatedRoute } from '@angular/router';

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

  basicdetails :any = []
  education:any = []
  family:any = []
  career:any = []
  url = 'http://localhost:3000'
  uniqueId: any
  filenames: any;
  ishr:any = []
  ishrappr:any = []

  constructor(private http : HttpClient, private active : ActivatedRoute)
  {
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
  .post('http://localhost:3000/basicforms', this.basic)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitedu(){
  console.log(this.edu)
  this.http
  .post('http://localhost:3000/edu', this.edu)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}


submitemer(){
  
  console.log(this.edu)
  this.http
  .post('http://localhost:3000/emergency', this.emer)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitfamily(){
  console.log(this.edu)
  this.http
  .post('http://localhost:3000/family', this.fam)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitother(){
  console.log(this.other)
  this.http
  .post('http://localhost:3000/others', this.other)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitprev(){
  console.log(this.prev)
  this.http
  .post('http://localhost:3000/prev', this.prev)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

sumbitlang(){
        this.http.
    post('http://localhost:3000/lang', this.lang)
    .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
  })
}

getdatabasic(uniqueId:any){

  this.http.
post('http://localhost:3000/getdatabasic',uniqueId)
.subscribe({
  next: (response) => {console.log("basic : ",response); this.basicdetails= response} ,
  error: (error) => console.log(error),
})
}

getdataqualifn(uniqueId:any){
  // this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  this.http.
post('http://localhost:3000/getdataqualfn',uniqueId)
.subscribe({
  next: (response) => {console.log("qualifn",response); this.education = response} ,
  error: (error) => console.log(error),
})
}

getdatafamily(uniqueId:any){
  // this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  this.http.
post('http://localhost:3000/getdatafamily',uniqueId)
.subscribe({
  next: (response) => {console.log("family",response); this.family = response} ,
  error: (error) => console.log(error),
})
}

getdatacareer(uniqueId:any){
  // this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  this.http.
post('http://localhost:3000/getdatacareer',uniqueId)
.subscribe({
  next: (response) => {console.log("career",response); this.career = response} ,
  error: (error) => console.log(error),
})
}

fileupload(file:any,uniqueId:any, id_no :any, fileno:any){
  const formData = new FormData()
  var changedname = id_no
  formData.append("file",file, changedname +'.'+ file.name.split('.')[1] )
  formData.append("mobile",uniqueId)

  formData.append("fileno",fileno)

    this.http.
    post('http://localhost:3000/image', formData).subscribe({
      next: (res)=> console.log(res),
      error: (err)=>console.log(err)
    })

}

rejected(){
  this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile_no1');

  console.log(this.uniqueId);

  this.http
  .post('http://localhost:3000/rejected', this.uniqueId)
  .subscribe({
    next: (response) =>{ console.log(response);},
    error: (error) => console.log(error),
  })
}

getHr(uniqueid: any)
{
  this.http.post('http://localhost:3000/gethr',uniqueid)
  .subscribe({
    next: (response) => {console.log(response); this.ishr = response;},
    error: (error) => console.log(error),
});
setTimeout(() => {
  localStorage.setItem('ishr', this.ishr[0]?.Is_HR)
}, 1000);


  this.http.post('http://localhost:3000/gethrappr',uniqueid)
      .subscribe({
        next: (response) => {console.log(response); this.ishrappr = response},
        error: (error) => console.log(error),
  });
setTimeout(() => {
  localStorage.setItem('ishrappr', this.ishrappr[0]?.Is_HRAppr)
  localStorage.setItem('plantcode', this.ishrappr[0]?.plant_code)
}, 1000);
}

filter(formvalue:any)
{
  this.http
  .post('http://localhost:3000/filter', formvalue)
  .subscribe({
    next: (response) =>{ console.log(response); this.filterinfo = response},
    error: (error) => console.log(error),
  });
}

}
