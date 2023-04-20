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
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BankComponent implements OnInit {
  closeResult: string;

  form: any

  sample: any = environment.path

  dummy: any = [

  ]
  editing_flag: any;
  temp_a: any;

  constructor(private fb: UntypedFormBuilder, private modalService: NgbModal, private service: ApiService, public loader: LoaderserviceService) {
    this.form = this.fb.group({
      sno: [''],
      Slno: [''],
      bank_name: [''],
      bank_code: [''],

    })
  }

  ngOnInit(): void {
    this.service.getbank().
      subscribe({
        next: (response) => { this.dummy = response }
      })
  }

  open(content: any) {
    this.form.reset();
    this.editing_flag = false
    console.log("opening")
    this.modalService.open(content, { centered: true })
  }

  save() {
    this.form.controls['sno'].setValue(this.dummy.length + 1)
    console.log(this.form.value);

    this.service.addbank(this.form.value)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.message == 'already') {
            alert('bank already exists')
          }
          else {
            this.dummy.push(this.form.value)

            this.form.reset()
          }
        }
      })

  }
  /////////////////////////////////////////////////////edit functions
  opentoedit(content: any) {
    console.log("opening")
    this.modalService.open(content, { centered: true })
  }

  edit(slno: any, a: any) {
    this.temp_a = a
    this.editing_flag = true
    this.form.controls['Slno'].setValue(this.dummy[a].Slno)
    this.form.controls['bank_name'].setValue(this.dummy[a].bank_name)
    this.form.controls['bank_code'].setValue(this.dummy[a].bank_code)
    console.log(this.form.value);

  }

  editSave() {
    console.log(this.form.value);

    this.service.updatebank(this.form.value)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.dummy[this.temp_a] = this.form.value
        }
      })
  }
  /////////////////////////////////////////////////////edit functions

  delete(slno: any, a: any) {
    this.service.deletebank({ Slno: slno })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.message == 'success')
            this.dummy.splice(a, 1)
        }
      })
  }

  exportexcel(): void {

    const newKeys:any = {
      bank_code: 'Bank Code',
      bank_name: 'Bank Name',
      del_status: 'Del Status',
    };

    // Map the array and transform each object
    const transformedArray:any = this.dummy.map((obj:any) => {
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
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'bank_details.xlsx');
  }

  reset() {
    this.form.reset()
  }

}
