import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FormService {
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

res:any;

submitbank(){
  console.log(this.bank)
  this.http.put(this.url+'/bankforms', this.bank)
  .subscribe({
      next: (response:any) => {console.log(response); this.res = response.message},
      error: (error) => console.log(error),
})
}

submitbasic(){
  console.log(this.basic)
  this.http.put(this.url+'/basicforms', this.basic)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitedu(){
  console.log(this.edu)
  this.http.put(this.url+'/edu', this.edu)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}


submitemer(){
  
  console.log(this.edu)
  this.http.put(this.url+'/emergency', this.emer)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitfamily(){
  console.log(this.edu)
  this.http.put(this.url+'/family', this.fam)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitother(){
  console.log(this.other)
  this.http.put(this.url+'/others', this.other)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

submitprev(){
  console.log(this.prev)
  this.http.put(this.url+'/prev', this.prev)
  .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
})
}

sumbitlang(){
        this.http.put(this.url+'/lang', this.lang)
    .subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
  })
}

getdatabasic(uniqueId:any){
  return this.http.get(this.url+'/getdatabasic?mobile='+uniqueId.mobile+'&company='+uniqueId.company)

}

getdataqualifn(uniqueId:any){
  // this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  return this.http.get(this.url+'/getdataqualfn?mobile='+uniqueId.mobile+'&company='+uniqueId.company)

}

getdatafamily(uniqueId:any){
  // this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  return this.http.get(this.url+'/getdatafamily?mobile='+uniqueId.mobile+'&company='+uniqueId.company)

}

getdatacareer(uniqueId:any){
  // this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  return this.http.get(this.url+'/getdatacareer?mobile='+uniqueId.mobile+'&company='+uniqueId.company)

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

    this.http.post(this.url+'/image', formData).subscribe({
      next: (res)=> {console.log(res);},
      error: (err)=>console.log(err)
    })

}

submitted(uniqueId: any){
  console.log("----------------------------", uniqueId)
  this.http.put(this.url+'/submitted',uniqueId)
  .subscribe({
    next: (response) =>{ console.log(response);},
    error: (error) => console.log(error),
  })
}

pending(uniqueId: any){
  this.http.put(this.url+'/pending',uniqueId)
  .subscribe({
    next: (response) =>{ console.log(response);},
    error: (error) => console.log(error),
  })
}

approved(uniqueId:any){

  this.http.put(this.url+'/approved', uniqueId)
  .subscribe({
    next: (response) =>{ console.log(response);},
    error: (error) => console.log(error),
  })
}

rejected(uniqueId:any){
  console.log(this.uniqueId);

  this.http.put(this.url+'/rejected', uniqueId)
  .subscribe({
    next: (response) =>{ console.log(response);},
    error: (error) => console.log(error),
  })
}

filter(form:any)
{
  return this.http.get(this.url+'/filter?status='+form.status+'&fromdate='+form.fromdate+'&todate='+form.todate+'&plantcode='+form.plantcode)
}

searchfilter(form:any)
{
  return this.http.post(this.url+'/searchfilter', form)

}
getbanknames()
{
    return this.http.get(this.url+'/getbanknames')
}

getpincode(pincode:any)
{
    return  this.http.get(this.url+'/getpincode?pincode='+pincode.pincode)
}

}
