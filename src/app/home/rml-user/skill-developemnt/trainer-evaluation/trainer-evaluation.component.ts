import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/home/api.service';
import { LoaderserviceService } from 'src/app/loaderservice.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-trainer-evaluation',
  templateUrl: './trainer-evaluation.component.html',
  styleUrls: ['./trainer-evaluation.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class TrainerEvaluationComponent implements OnInit {
  
  someSubscription: any
  filterinfo: any = []
  id: any
  form: any
  searchText: any
  year:Number[] = []
  options = [
    { label: '0 to 60 days', value: '0-60' },
    { label: '61 to 120 days', value: '61-120' },
    { label: '121 to 180 days', value: '121-180' },
    { label: '181 to 270 days', value: '181-270' }
  ];

  constructor(private fb: UntypedFormBuilder, private http: HttpClient, private service: ApiService, private active: ActivatedRoute, private router: Router, private modalService: NgbModal,public loader:LoaderserviceService) {

    this.form = this.fb.group({
      status: ['0-60'],
      plantcode: [sessionStorage.getItem('plantcode')],
      id: ['1'],
      filter: ['PENDING'],
      year : [new Date().getFullYear()]

    });

  }

  ngOnInit(): void {

    const currentYear = new Date().getFullYear();
    const oldestYear = currentYear - 15;
    for (let i = currentYear; i >= oldestYear; i--) {
      this.year.push(i);
    }

    this.service.evaluationdays(this.form.value)
      .subscribe(
        {
          next: (response) => { console.log(response); this.filterinfo = response }
        }
      )
  }

  formatDate(dateString: string): string 
  {
    const formattedDate = dateString.split('T')[0].replace(/\./g, '-');
    return formattedDate ? new Date(formattedDate).toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'}) : 'Invalid Date';
  }
  

  filter() {
    if (this.form.get('filter').value == 'PENDING_APPROVAL') {
      console.log(this.form.value)
      this.service.eval_pending_approval(this.form.value)
        .subscribe(
          {
            next: (response) => { console.log(response); this.filterinfo = response }
          }
        )
    }
    else {
      console.log(this.form.value)
      this.service.evaluationdays(this.form.value)
        .subscribe(
          {
            next: (response) => { console.log(response); this.filterinfo = response }
          }
        )
    }

  }

  save() {
    console.log(this.form.value)
  }

  exportexcel()
{
  const x = document.querySelector("#table")
  const ws = XLSX.utils.table_to_sheet(x);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Table');
  XLSX.writeFile(wb, 'table.xlsx');
}

}
