import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})

export class EvaluationFormComponent implements OnInit {

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
    

  }

  

  
  getDataForID(){
  
      }
 
  

    }
