import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Route, Router, RouteReuseStrategy, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';
import { LoaderserviceService } from 'src/app/loaderservice.service';
@Component({
  selector: 'app-evaluaton-due',
  templateUrl: './evaluaton-due.component.html',
  styleUrls: ['./evaluaton-due.component.css']
})
export class EvaluatonDueComponent implements OnInit {

  someSubscription:any
  filterinfo:any = []
  id:any
  form:any
  tick :any = '✔️'
  ex:any
  constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router,public loader:LoaderserviceService) {

    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    // this.someSubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Here is the dashing line comes in the picture.
    //     // You need to tell the router that, you didn't visit or load the page previously, so mark the navigated flag to false as below.
    //     this.router.navigated = false;
    //   }
    // });

    this.form = this.fb.group({
      status: ['0-60'],
      plantcode: [sessionStorage.getItem('plantcode')],
      id: ['3']

    });

   }

  ngOnInit(): void {
    
    this.filter()
  }

  filter()
  {
    if(sessionStorage.getItem('issupervisor') == 'true')
    {
      var form = {plant_code : sessionStorage.getItem('plantcode'), dept_slno : ''}
      var x:any = sessionStorage.getItem('all')
      x = JSON.parse(x)
      form.dept_slno = x.Department
      this.service.evaluationDueSupervisor(form)
      .subscribe(
        {
          next: (response)=>{console.log(response); this.filterinfo = response}
        }
      ) 
    }
    else
    {
      this.service.evaluationdays(this.form.value)
      .subscribe(
        {
          next: (response)=>{console.log(response); this.filterinfo = response}
        }
      ) 
    }

  }

}
