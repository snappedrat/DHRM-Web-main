import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  trainee:any
  test:any
  constructor(private service: ApiService) { }

  ngOnInit(): void {

    this.service.test_summary()
    .subscribe({
      next: (response)=>{this.test = response}
    })
    this.service.trainee_report()
    .subscribe({
      next: (response)=>{this.trainee = response}
    })

  }

  down1()
  {
    var ws = XLSX.utils.json_to_sheet(this.trainee);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People");
    XLSX.writeFile(wb,"trainee_list.xlsx"); 
  }
  down2()
  {
    var ws = XLSX.utils.json_to_sheet(this.test);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People");
    XLSX.writeFile(wb,"test.xlsx");
  }

}
