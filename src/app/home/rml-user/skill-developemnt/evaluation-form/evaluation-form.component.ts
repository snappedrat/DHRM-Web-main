import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from 'src/app/home/api.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})

export class EvaluationFormComponent implements OnInit {

  evaluation_date: any
  score_obtained:any
  score_for:any
  percentage : any
  upload_file : any
  line:any
  department: any
  new_skill: any
  process_trained: any
  uniqueId :any = {'mobile':''}
  form:any    
  status: any = {'status': ''}
  formvalues: any
  address:any  = 'hello'
  url: any = environment.path
      constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router, private modalService : NgbModal) {
    
        this.form = this.fb.group({
          evaluation_date: [''],
          score_obtained:[''],
          score_for:[''],
          percentage : [''],
          upload_file : [''],
          line: [''],
          department: [''],
          new_skill: [''],
          process_trained: ['']
        });
    
       }
    
      ngOnInit(): void {
    
        console.log("00",this.form.value)
    
        this.service.depttransfer(this.form.value)
        
        
      }
      getDataForID(){
        this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
        this.uniqueId.company = this.active.snapshot.paramMap.get('company');
    
        this.status.status = this.active.snapshot.paramMap.get('status');
        
        console.log(this.status)
    
        this.http
        .post(this.url+'/getdataforid', this.uniqueId)
        .subscribe({
          next:(response)=>{console.log(response); this.formvalues = response
            this.form.controls['permanent'].setValue(this.formvalues[0]?.permanent_address)
            this.form.controls['company_address'].setValue(this.formvalues[0]?.addr)
    
            this.url = this.url+'/' + this.formvalues[0]?.other_files6
            console.log("url",this.url)
          },
          error: (error) => 
          console.log(error),
        })}
 save()
      {
        console.log(this.form.value)
      }
    
    reset(){
      
    }
    
    
  submit()
  {

  }
}