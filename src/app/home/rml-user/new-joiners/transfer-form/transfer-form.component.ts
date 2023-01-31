import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent implements OnInit {

  form:any
  gen_id: any 

  changedepartment : any
  changeline : any
  reportingto: any 

  obj:any
  
    flag: any = true;
    state: boolean;
  
    constructor(private fb : UntypedFormBuilder,private http: HttpClient,private active :ActivatedRoute , private service: ApiService, private router : Router) {
    
      this.form = this.fb.group({
        
        gen_id: [''],
        current_department: [''],
        current_line: [''],
        changedepartment : [''],
        changeline : [''],
        reportingto:  [''],
        plantcode:[sessionStorage.getItem('plantcode')]
     
      })
  
    }
  
  
    ngOnInit(): void {

      this.form.controls['gen_id'].setValue(this.active.snapshot.paramMap.get('id'))

      var object = {
        'dept_slno': this.active.snapshot.paramMap.get('dept'),
        'line_code':this.active.snapshot.paramMap.get('line')
      }

      this.service.dept_line(object)
      .subscribe({
        next: (response)=>{console.log(response); 
          this.obj = response;
          this.form.controls['current_department'].setValue(this.obj[0]?.dept_name)
          this.form.controls['current_line'].setValue(this.obj[1]?.line_name)
          this.obj = []
        }
      })

      this.service.dept_line_report({plantcode: sessionStorage.getItem('plantcode')})
      .subscribe(
        {
          next: (response)=>
          {
            console.log(response);
            this.obj = response;
            this.reportingto = this.obj[0]
            this.changedepartment = this.obj[1]
            this.changeline = this.obj[2]
          }
        }
      )

     
    }
    submit()
    {
      console.log(this.form.value)

      this.service.reporting(this.form.value)
      .subscribe(
        {
          next: (response:any)=>{console.log(response);
          if(response.message == 'success')
          {
            alert("Department transferred")
            this.router.navigate(['/rml/new_joiners/dept_transfer'])
          }
          }
        }
      )
    }

}
