import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';
import { LoaderserviceService } from 'src/app/loaderservice.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-trainee-score-card',
  templateUrl: './trainee-score-card.component.html',
  styleUrls: ['./trainee-score-card.component.css']
})
export class TraineeScoreCardComponent implements OnInit {

  idno :any
  data:any 
  fullname: any;
  constructor(private active: ActivatedRoute, private service : ApiService,public loader:LoaderserviceService) { }

  ngOnInit(): void {

    this.idno = this.active.snapshot.paramMap.get('trainee_idno')
    this.fullname = this.active.snapshot.paramMap.get('fullname')

    this.service.traineeScorecard({'trainee_idno': this.idno})
    .subscribe({
      next: (response)=>{console.log('score', response); this.data = response},
      error: (err)=>{console.log(err)}
    })
  }

  exportexcel()
  {
    const wb = XLSX.utils.book_new();
    const x = document.querySelector('#table')
    // Create a new worksheet
    const ws = XLSX.utils.table_to_sheet(x);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Table');
    // Save the workbook as an Excel file
    XLSX.writeFile(wb, 'table.xlsx');
  }

  dummy :any = [
    {
      module_attended:'Induction Training',
      minpassp:"80.00",
      pts:"5.00",
      pts1:"10.00",
      ptp:"0.00",
      ptpt:"50.00",
      ptp1:"100.00",
      prepf:"Fail",
      postpf:"Pass",
      post1pf:"pass"
    },
    {
      module_attended:'safety',
      minpassp:"80.00",
      pts:"5.00",
      pts1:"10.00",
      ptp:"0.00",
      ptpt:"50.00",
      ptp1:"100.00",
      prepf:"Fail",
      postpf:"Pass",
      post1pf:"pass"
    },
    {
      module_attended:'SS',
      minpassp:"80.00",
      pts:"5.00",
      pts1:"10.00",
      ptp:"0.00",
      ptpt:"50.00",
      ptp1:"100.00",
      prepf:"Fail",
      postpf:"Pass",
      post1pf:"pass"
    },
    {
      module_attended:'Fundamental',
      minpassp:"80.00",
      pts:"5.00",
      pts1:"10.00",
      ptp:"0.00",
      ptpt:"50.00",
      ptp1:"100.00",
      prepf:"Fail",
      postpf:"Pass",
      post1pf:"pass"
    },
  ]
}


