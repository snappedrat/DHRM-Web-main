import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormGroup,UntypedFormControl, UntypedFormBuilder, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Route, Router, RouteReuseStrategy, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/home/api.service';
@Component({
  selector: 'app-trainer-evaluation',
  templateUrl: './trainer-evaluation.component.html',
  styleUrls: ['./trainer-evaluation.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class TrainerEvaluationComponent implements OnInit {

  someSubscription:any
  filterinfo:any = []
  id:any
  form:any

  constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router, private modalService : NgbModal) {

    this.form = this.fb.group({
      status: ['0-60'],
      plantcode: [sessionStorage.getItem('plantcode')],
      id: ['1']

    });

   }

  ngOnInit(): void {

    this.service.evaluationdays(this.form.value)
    .subscribe(
      {
        next: (response)=>{console.log(response); this.filterinfo = response}
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


  save()
  {
    console.log(this.form.value)
  }

}
