import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { threadId } from 'worker_threads';


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

  constructor(private http: HttpClient, private active : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getdatabasic()
    this.getdataqualifn()
    this.getdatacareer()
    this.getdatafamily()

  }

  approved()
  {
      this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');

      console.log(this.uniqueId);

      this.http
      .post('http://localhost:3000/approved', this.uniqueId)
      .subscribe({
        next: (response) =>{ console.log(response);},
        error: (error) => console.log(error),
      })
      window.alert("Application has been approved")
      this.router.navigate(['rml/new_joiners/hr-approval'])

  }

  rejected()
  {
    this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');

    console.log(this.uniqueId);

    this.http
    .post('http://localhost:3000/rejected', this.uniqueId)
    .subscribe({
      next: (response) =>{ console.log(response);},
      error: (error) => console.log(error),
    })
    window.alert("Application has been rejected")
    this.router.navigate(['rml/new_joiners/hr-approval'])
  }


getdatabasic(){
  this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  this.http.
post('http://localhost:3000/getdatabasic',this.uniqueId)
.subscribe({
  next: (response) => {console.log("basic",response); this.basic = response} ,
  error: (error) => console.log(error),
})
}

getdataqualifn(){
  this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  this.http.
post('http://localhost:3000/getdataqualfn',this.uniqueId)
.subscribe({
  next: (response) => {console.log("basic",response); this.education = response} ,
  error: (error) => console.log(error),
})
}


getdatafamily(){
  this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  this.http.
post('http://localhost:3000/getdatafamily',this.uniqueId)
.subscribe({
  next: (response) => {console.log("basic",response); this.family = response} ,
  error: (error) => console.log(error),
})
}

getdatacareer(){
  this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
  this.http.
post('http://localhost:3000/getdatacareer',this.uniqueId)
.subscribe({
  next: (response) => {console.log("basic",response); this.career = response} ,
  error: (error) => console.log(error),
})
}
}
