import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { UntypedFormBuilder} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/home/api.service';
import { FilterPipe } from '../../filter.pipe';

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
  searchText:any

  constructor(private fb : UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router, private modalService : NgbModal) {

    this.form = this.fb.group({
      status: ['0-60'],
      plantcode: [sessionStorage.getItem('plantcode')],
      id: ['1'],
      filter:['PENDING']

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
    if(this.form.get('filter').value == 'PENDING_APPROVAL')
    {
      console.log(this.form.value)
      this.service.eval_pending_approval(this.form.value)
      .subscribe(
        {
          next: (response)=>{console.log(response); this.filterinfo = response}
        }
      ) 
    }
    else
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

  save()
  {
    console.log(this.form.value)
  }

}
