import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-idcard',
  templateUrl: './idcard.component.html',
  styleUrls: ['./idcard.component.css']
})

export class IdcardComponent implements OnInit {

  uniqueId :any = {'mobile':''}
  status: any = {'status': ''}
  formvalues: any
  date:any = new Date()
  from_date:any = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+ this.date.getDate();
  ddate : any = +this.from_date.split('-')[2] + +10
  to_date :any = this.from_date.split('-')[0]+'-'+this.from_date.split('-')[1]+'-'+this.ddate
    constructor(private active: ActivatedRoute, private http: HttpClient ) { }

  ngOnInit(): void {
    this.getDataForID()
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
    .post('http://localhost:3000/getdataforid', this.uniqueId)
    .subscribe({
      next:(response)=>{console.log(response); this.formvalues = response},
      error: (error) => 
      console.log(error),
    })
    
  }
}
