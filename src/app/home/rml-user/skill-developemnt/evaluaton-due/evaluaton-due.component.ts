import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Route, Router, RouteReuseStrategy, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';
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

  constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router) {

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
      status: ['0-90'],
      plantcode: [sessionStorage.getItem('plantcode')],
      id: ['3']

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
        next: (response)=>{console.log(response); this.filterinfo = response}
      }
    )
  }

  filter()
  {
    this.service.evaluationdays(this.form.value)
    .subscribe(
      {
        next: (response)=>{console.log(response); this.filterinfo = response}
      }
    ) 
  }

}
