import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Route, Router, RouteReuseStrategy, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';
import { LoaderserviceService } from 'src/app/loaderservice.service';

@Component({
  selector: 'app-supervisor-evaluation',
  templateUrl: './supervisor-evaluation.component.html',
  styleUrls: ['./supervisor-evaluation.component.css']
})
export class SupervisorEvaluationComponent implements OnInit {

  someSubscription:any
  filterinfo:any = []
  id:any
  form:any
  filterinfos: any;

  constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router,public loader:LoaderserviceService) {


    this.form = this.fb.group({
      status: ['0-60'],
      plantcode: [sessionStorage.getItem('plantcode')],
      id: ['2'],
      emp_id: [sessionStorage.getItem('user_name')]
    });

   }

  //  ngOnDestroy() {
  //   if (this.someSubscription) {
  //     this.someSubscription.unsubscribe();
  //   }
  // }


  ngOnInit(): void {

    console.log("00",this.form.value)

    this.service.evaluationdays(this.form.value)
    .subscribe(
      {
        next: (response)=>{console.log(response); 
          this.filterinfo = response
          this.filterinfos = this.filterinfo.filter((obj:any)=> obj.ra_entry !== 'N')
          console.log(this.filterinfos)
        }
      }
    )
  }

  filter()
  {
    console.log(this.form.value)
    this.service.evaluationdays(this.form.value)
    .subscribe(
      {
        next: (response)=>{console.log(response); this.filterinfo = response}
      }
    ) 
  }

}
