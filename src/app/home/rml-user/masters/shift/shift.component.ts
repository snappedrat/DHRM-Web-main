import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import * as XLSX from 'xlsx';
// import { MatSidenav } from "@angular/material/sidenav";
// import { MatTableModule } from "@angular/material/table";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { LoaderserviceService } from 'src/app/loaderservice.service';
import { environment } from "src/environments/environment.prod";

const material = [
  MatSidenav,
  MatTableModule
];



@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ShiftComponent implements OnInit {
  closeResult: string;

  form: any

  sample: any = environment.path
  plant_name: any
  plant: any

  shift: any = []
  editing_flag: any;
  temp_a: any;
  type: any = ['S', 'R']
  security_shift: any = ['Y', 'N']

  constructor(private fb: UntypedFormBuilder, private modalService: NgbModal, private service: ApiService, public loader: LoaderserviceService) {
    this.form = this.fb.group({
      shift_id: [''],
      shift_desc: [''],
      plant_desc: [''],
      plant_code: [''],
      act_tm_from: [''],
      in_tm_max: [''],
      in_tm_min: [''],
      act_tm_to: [''],
      type: [''],
      shift_group: [''],
      security_shift: [''],
      coff_eligible_hours: ['']
    })
  }

  ngOnInit(): void {

    this.service.getplant().
      subscribe({
        next: (response: any) => {
          this.plant = response;
        }
      })

    this.service.getshift().
      subscribe({
        next: (response: any) => {
          this.shift = response; console.log(response)
        }
      })
  }

  pp(event: any) {
    console.log(event.target.value);
    var x = event.target.value.split(':')[0] - 1
    this.form.get('plant_desc').setValue(this.plant[x].plant_name)
    console.log(this.form.value);
  }

  open(content: any) {
    this.form.reset()
    this.editing_flag = false
    console.log("opening")
    this.modalService.open(content, { centered: true })
  }

  save() {
    console.log(this.form.value);
    this.service.addshift(this.form.value)
      .subscribe({
        next: (response: any) => {
          console.log(response);

          this.service.getshift().
            subscribe({
              next: (response: any) => {
                this.shift = response; console.log(response)
              }
            })
          this.form.reset()
        }
      })

  }
  /////////////////////////////////////////////////////edit functions
  opentoedit(content: any) {
    console.log("opening")
    this.modalService.open(content, { centered: true })
  }

  edit(a: any, slno: any) {
    this.form.reset()
    this.temp_a = a

    this.editing_flag = true

    this.form.controls['plant_desc'].setValue(this.shift[a].plant_desc)
    this.form.controls['shift_id'].setValue(slno)
    this.form.controls['plant_code'].setValue(String(this.shift[a].plant_code))
    this.form.controls['shift_desc'].setValue(this.shift[a].shift_desc)
    this.form.controls['act_tm_from'].setValue(this.shift[a].Shift_Start)
    this.form.controls['act_tm_to'].setValue(this.shift[a].Shift_End)
    this.form.controls['in_tm_max'].setValue(this.shift[a].Max_Time)
    this.form.controls['in_tm_min'].setValue(this.shift[a].Min_Time)
    this.form.controls['shift_group'].setValue(this.shift[a].shift_group)
    this.form.controls['type'].setValue(this.shift[a].type)
    this.form.controls['security_shift'].setValue(this.shift[a].security_shift)
    this.form.controls['coff_eligible_hours'].setValue(this.shift[a].coff_eligible_hours)

    console.log(this.form.value)
    this.form.get('plant_code').disable()
  }

  editSave() {
    this.form.get('plant_code').enable()
    console.log(this.form.value);

    this.service.updateshift(this.form.value)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.message == 'updated') {
            this.form.controls['act_tm_from'].setValue('T' + this.form.controls['act_tm_from'].value + '.')
            this.form.controls['act_tm_to'].setValue('T' + this.form.controls['act_tm_to'].value + '.')
            this.form.controls['in_tm_max'].setValue('T' + this.form.controls['in_tm_max'].value + '.')
            this.form.controls['in_tm_min'].setValue('T' + this.form.controls['in_tm_min'].value + '.')

            this.service.getshift().
              subscribe({
                next: (response: any) => {
                  this.shift = response; console.log(response)
                }
              })
          }
        }
      })
  }
  ///////////////////////////////////////////////////////////////////////////////edit functions

  delete(a: any, slno: any) {
    this.service.deleteshift({ slno: slno })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.message == 'success')
            this.shift.splice(a, 1)
        }
      })
  }

  exportexcel(): void {

    const newKeys:any = {
      shift_id: 'Shift ID',
      plant_code: 'Plant Code',
      plant_desc: 'Plant Name',
      shift_desc: 'Shift Description',
      Shift_Start: 'Shift Start Time',
      Shift_End: 'Shift End Time',
      Min_Time: 'Minimum Time',
      Max_Time: 'Maximum Time',
      type: 'Shift Type',
      shift_group: 'Shift Group',
      security_shift: 'Security Shift',
      coff_eligible_hours: 'Comp Off Eligible Hours',
    };

    // Map the array and transform each object
    const transformedArray:any = this.shift.map((obj:any) => {
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
    XLSX.writeFile(wb, 'shift.xlsx');
  }

  reset() {
    this.form.reset()
  }

}
