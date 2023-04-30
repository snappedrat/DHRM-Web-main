import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ApiService } from 'src/app/home/api.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-evaluation-due-report',
  templateUrl: './evaluation-due-report.component.html',
  styleUrls: ['./evaluation-due-report.component.css']
})
export class EvaluationDueReportComponent implements OnInit {

  dateForm:FormGroup
  progressValue: number = 0 ;
  excel: any;

  constructor(private fb: UntypedFormBuilder, private dateAdapter: DateAdapter<Date>, private service: ApiService) {
    this.dateAdapter.setLocale('en-GB');

    this.dateForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      plant_code: [sessionStorage.getItem('plantcode')]
    });
  }

  interval:any


  ngOnInit(): void {



  }

  submit()
  {
    this.progressValue = 0
    this.service.eval_due(this.dateForm.value)
    .subscribe(
      {
        next: (res:any)=>{
          console.log(res);
          this.excel = res;
          this.progressValue = 100;
        }
      }
    )

    const interval = setInterval(() => {
      if (this.progressValue >= 100) {
        clearInterval(interval);
      } else {
        this.progressValue += 1;
      }
    }, 500);
  }

  exportexcel(): void
{
  const newKeys:any = {
    trainee_idno: 'Trainee ID',
    fullname: 'Trainee Name',
    dept_name: 'Department Name',
    line_name: 'Line Name',
    evaluation_completed: 'No of Evaluation Completed'
  };

  // Map the array and transform each object
  const transformedArray:any = this.excel.map((obj:any) => {
    const transformedObj:any = {};
    Object.keys(obj).forEach(key => {
      const newKey = newKeys[key] || key;
      transformedObj[newKey] = obj[key];
    });
    return transformedObj;
  });
  console.log(transformedArray);

  var ws = XLSX.utils.json_to_sheet(transformedArray);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "People");
  XLSX.writeFile(wb,"evaluation-due.xlsx");

}
}
