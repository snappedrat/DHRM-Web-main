import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { LoaderserviceService } from 'src/app/loaderservice.service';
import { environment } from "src/environments/environment.prod";
import * as XLSX from 'xlsx';
const material = [
  MatSidenav,
  MatTableModule
];

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CompanyComponent implements OnInit {
  closeResult: string;

  form:any

  sample : any = environment.path

  year:any 
  month:any
  day:any
  date:any
  dummy: any = [

  ]
  editing_flag: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService,public loader:LoaderserviceService) {
    this.form = this.fb.group({
      sno : [''],
      company_code :[''],
      company_name : [''],
      created_on: [''],
      created_by: [''],
      modified_on: [''],
      modified_by: [''],     
    })
   }

  ngOnInit(): void {
    this.service.companyshow().
    subscribe({
      next: (response)=>{this.dummy = response}
    })
  }

  open(content:any)
  {
    this.form.reset();
    this.editing_flag = false
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  date_format()
  {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth()+1;
    this.day = new Date().getDate();  
    this.date = this.year+'-'+this.month+'-'+this.day
  }

  save()
  {
    this.date_format()
    this.form.controls['created_on'].setValue(this.date)
    console.log(this.month)

    this.form.controls['created_by'].setValue(sessionStorage.getItem('emp_name'))
    this.service.companyadd(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);
      if(response.message == 'already')
      {
        alert('company with same code value already exists')
      }
    else
      {
        this.dummy.push(this.form.value)
        this.form.reset()
        console.log(this.form.value)
      }}
    })    

  }

/////////////////////////////////////////////////////edit functions

  opentoedit(content:any)
  {
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  edit(a:any)
  {
    console.log("-----------", a)

    this.editing_flag = true
    this.form.controls['sno'].setValue(a)
    this.form.controls['company_code'].setValue(this.dummy[a].company_code)
    this.form.controls['company_name'].setValue(this.dummy[a].company_name)
    console.log(this.editing_flag)
  }

  editSave()
  {
    
    this.date_format()
    this.form.controls['modified_on'].setValue(this.date)
    this.form.controls['modified_by'].setValue(sessionStorage.getItem('emp_name'))

    this.service.companyedit(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
      if(response.message== 'already')
      {
        alert('company with same code already exists')
      }
    else
      {
        this.form.controls['created_on'].setValue(this.dummy[this.form.controls['sno'].value].created_on)    
        this.form.controls['created_by'].setValue(this.dummy[this.form.controls['sno'].value].created_by)

        this.dummy[this.form.controls['sno'].value] = this.form.value
      }}
    })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any)
{
  this.service.companydel(this.dummy[a])
  .subscribe({
    next: (response:any) =>{console.log(response); 
    if(response.message == 'success')
      this.dummy.splice(a,1)
  }
  })
}

exportexcel(): void
{
  // let element = document.getElementById('table');
  // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  // const wb: XLSX.WorkBook = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  // XLSX.writeFile(wb, 'master_company.xlsx');

  var ws = XLSX.utils.json_to_sheet(this.dummy);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "People");
  XLSX.writeFile(wb,"company.xlsx");

}

reset()
{
  this.form.reset()
}

}
