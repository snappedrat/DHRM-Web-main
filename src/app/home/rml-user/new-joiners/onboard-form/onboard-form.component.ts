import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-onboard-form',
  templateUrl: './onboard-form.component.html',
  styleUrls: ['./onboard-form.component.css']
})
export class OnboardFormComponent implements OnInit {
  form: any
  ifsc_code: any
  grade: any = [1, 2, 3, 4]
  account_number: any
  department: any
  active_status: any = ['ACTIVE', 'INACTIVE']
  bank_name: any
  line: any
  b_id: any
  process_trained: any
  rfr: any = ['GOOD', 'BAD']
  b_num: any
  reporting_to: any
  uan: any
  w_contract: any = ['DIRECT', 'INDIRECT']
  trainee_id: any
  designation: any
  basic: any
  status: any = this.active.snapshot.paramMap.get('apln_status')
  apln_slno: any = this.active.snapshot.paramMap.get('id')
  down: any

  readonly: boolean = (this.status == 'APPOINTED') ? true : false

  obj: any = []



  OnboardData = [
  ];

  flag: any = true;
  state: boolean;
  category: any;
  cat: any;
  cate: any;
  oprn: any;
  setting: number;
  true: boolean = false;
  onboard: any = true
  department_: any;
  fullname: any;

  constructor(private fb: UntypedFormBuilder, private http: HttpClient, private router: Router, private active: ActivatedRoute, private service: ApiService) {

    this.form = this.fb.group({

      ifsc_code: ['', Validators.required],
      grade: [1],
      doj: ['', Validators.required],
      account_number: ['', Validators.required],
      department: [''],
      active_status: ['ACTIVE'],
      bank_name: ['', Validators.required],
      line: [''],
      dol: new FormControl(''),
      bio_id: [''],
      process_trained: [''],
      rfr: new FormControl(''),
      bnum: ['', Validators.required],
      reportingto: [''],
      uan: ['', Validators.maxLength(12)],
      wcontract: [''],
      trainee_id: [''],
      designation: [''],
      plantcode: [sessionStorage.getItem('plantcode')],
      apln_slno: [''],
      category: ['']

    })

  }

  values: any

  ngOnInit(): void {
    this.form.get('bnum').setValue(this.active.snapshot.paramMap.get('id'))
    this.form.controls['bio_id'].setValue(false)

    this.service.getonboard({ apln_slno: this.active.snapshot.paramMap.get('id'), readonly: this.readonly })
      .subscribe(
        {
          next: (response: any) => {
            this.obj = response;
            this.basic = this.obj[0]
            this.designation = this.obj[1]
            this.department = this.obj[2]
            this.line = this.obj[3]
            this.process_trained = this.obj[4]
            this.reporting_to = this.obj[5]
            this.category = this.obj[6]
            this.oprn = this.obj[7]

            this.form.controls['ifsc_code'].setValue(this.basic[0]?.ifsc_code == 'null' ? null : this.basic[0]?.ifsc_code)
            this.form.controls['account_number'].setValue(this.basic[0]?.bank_account_number == 'null' ? null : this.basic[0]?.bank_account_number)
            this.form.controls['bank_name'].setValue(this.basic[0]?.bank_name == 'null' ? null : this.basic[0]?.bank_name)
            this.form.controls['apln_slno'].setValue(this.basic[0]?.apln_slno)
            this.fullname = this.basic[0]?.fullname
            this.trainee_id = this.basic[0]?.trainee_idno

            if (this.readonly == false) {
              this.form.controls['grade'].disable()
              this.form.controls['active_status'].disable()
            }

            if (this.readonly == true) {
              this.form.controls['grade'].setValue(this.basic[0]?.emp_grade)
              this.form.controls['department'].setValue(this.basic[0]?.dept_slno)

              if (this.readonly) {
                this.getLineName(this.form.get('department').value)
              }
              this.form.controls['line'].setValue(this.basic[0]?.line_code)
              this.form.controls['process_trained'].setValue(this.basic[0]?.oprn_desc)
              this.form.controls['bnum'].setValue(this.basic[0]?.biometric_no)
              this.form.controls['bio_id'].setValue(true)
              this.form.controls['uan'].setValue(this.basic[0]?.uan_number)
              this.form.controls['trainee_id'].setValue(this.basic[0]?.gen_id)
              this.form.controls['reportingto'].setValue(this.basic[0]?.reporting_to)
              this.form.controls['wcontract'].setValue('DIRECT')
              this.form.controls['doj'].setValue(this.basic[0]?.doj)
              this.form.controls['active_status'].setValue(this.readonly ? 'ACTIVE' : 'INACTIVE')
              if (this.form.controls['active_status'].value == 'ACTIVE') {
                this.form.controls['rfr'].disable()
                this.form.controls['dol'].disable()
              }


              this.form.controls['category'].setValue(this.basic[0]?.apprentice_type)

              this.form.controls['department'].disable()
              this.form.controls['designation'].disable()
              this.form.controls['line'].disable()
              this.form.controls['grade'].disable()
              this.form.controls['reportingto'].disable()
              this.form.controls['wcontract'].disable()
              this.form.controls['designation'].disable()
              this.form.controls['doj'].disable()
              this.form.controls['category'].disable()

            }
            else {
              this.form.controls['rfr'].disable()
              this.form.controls['dol'].disable()
            }

            // this.line = this.line.map((line_name:any) => line_name.line_name)
            // this.designation = this.designation.map((a:any) => a.desig_name)
            // this.department = this.department_.map((a:any) => a.dept_name)
            this.process_trained = this.process_trained.map((a: any) => a.oprn_desc)
            // this.reporting_to = this.reporting_to.map((a:any) => a.emp_name)
            this.cat = this.category.map((a: any) => a.categorynm)
            this.oprn = this.oprn.map((a: any) => a.oprn_desc)
          }
        }
      )

    if (this.readonly == true) {
      this.form.controls["dol"].setValidators(Validators.required);
      this.form.controls["rfr"].setValidators(Validators.required);
    }
  }
  get pc() {
    return this.form.controls
  }

  call(event: any) {
    if (this.form.get('uan').value.toString().length > 12)
      this.true = true
    else
      this.true = false
  }

  submit() {

    console.log(this.form.value)

    if (this.readonly == false) {
      this.form.get('grade').enable()
      this.service.onboard_form(this.form.value)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            if (response.message == 'success') {
              alert('The Employee has been Appointed');
              if (this.setting == 1) {
                this.form.controls['trainee_id'].setValue()
                this.service.getfiledrop({ apln_slno: this.active.snapshot.paramMap.get('id') })
                  .subscribe(
                    {
                      next: (response) => {
                        console.log("down", response);
                        this.down = response;
                        this.exportexcel();

                      }
                    }
                  )
              }
              this.router.navigate(['/rml/new_joiners/onboard'])
            }

          },
          error: (err) => { 
            console.log(err) 
          }
        })
    }
    else if (this.readonly == true) {
      this.service.relieve(this.form.value)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            if (response.message == 'success') {
              alert('The Employee has been Relieved ')
              this.router.navigate(['/rml/new_joiners/onboard'])
            }
          },
          error: (err) => { 
            console.log(err) 
          }
        })
    }
  }

  rel() {
    if (this.form.get('dol').value != '' && this.form.get('rfr').value != '')
      this.onboard = false
    if (this.form.get('active_status').value == 'ACTIVE')
      this.onboard = true

  }


  change(event: any) {
    console.log(event.target.value)

    if (event.target.value.split(':')[1].trim() == 'INACTIVE') {
      this.form.controls['dol'].enable()
      this.form.controls['rfr'].enable()
    }
    else if (event.target.value.split(':')[1].trim() == 'ACTIVE') {
      this.form.controls['dol'].disable()
      this.form.controls['rfr'].disable()
    }

  }

  gen_id(event: any) {
    var value = event.target.value
    console.log(value)
    if (this.category[value.split(':')[0] - 1].file_drop == '1') {
      this.setting = 1
      this.form.controls['trainee_id'].setValue()
    }
    else if (this.category[value.split(':')[0] - 1].file_drop == '0') {
      this.setting = 0
      this.form.controls['trainee_id'].setValue(value.split(' ')[1].split('')[0] + this.active.snapshot.paramMap.get('id'))
    }
  }

  exportexcel() {
    const aoa = this.down.map((obj: any) => Object.values(obj));
    var ws = XLSX.utils.aoa_to_sheet(aoa)
    var wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'people')
    var buffer = XLSX.write(wb, { type: 'buffer', bookType: 'csv' });
    const file = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    var formData = new FormData()
    formData.append("file", file, 'CR_' + this.apln_slno + '_' + this.down[0].startdt + '.csv')

    this.service.filedrop(formData)
      .subscribe
      (
        {
          next: (response) => { 
            console.log(response) 
          }
        }
      )

  }

  getLineName(event: any) {
    if (!this.readonly)
      var dept = { dept_slno: event.target.value.split(' ')[1] }
    else
      var dept = { dept_slno: event }
    this.service.getLineName(dept)
      .subscribe(
        {
          next: (response: any) => {
            console.log(response);
            this.line = response[0];
            // this.line = this.line.map((a:any) => a.line_name)
            this.reporting_to = response[1];
            // this.reporting_to = this.reporting_to.map((a:any) => a.emp_name)

          }
        })
  }
  printid()
  {
    const url = this.router.createUrlTree(['/perm-idcard', this.apln_slno, this.form.controls['category'].value]);
    window.open(url.toString(), '_blank');
  }

}
