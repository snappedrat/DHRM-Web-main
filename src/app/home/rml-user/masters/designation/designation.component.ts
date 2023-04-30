import {
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import {
  UntypedFormBuilder
} from "@angular/forms";
import { MatSidenav } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import * as XLSX from "xlsx";





import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "src/app/home/api.service";
import { LoaderserviceService } from "src/app/loaderservice.service";
import { environment } from "src/environments/environment.prod";

const material = [
  MatSidenav,
  MatTableModule
];




@Component({
  selector: 'app-dept',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DesignationComponent implements OnInit {
  closeResult: string;

  form: any

  plantname: any

  temp_a: any
  sample: any = environment.path
  array: any = []
  index: any = -1

  designation: any = [

  ]
  editing_flag: any;

  constructor(private fb: UntypedFormBuilder, private modalService: NgbModal, private service: ApiService, public loader: LoaderserviceService) {
    this.form = this.fb.group({
      slno: [''],
      desig_name: [''],
      plant_name: [''],
      names: [''],
      plant_code: ['']

    })
  }



  exportexcel(): void {

        // Define the new key names
        const newKeys:any = {
          desig_name: 'Designation Name',
          plant_code: 'Plant Code',
          plant_name: 'Plant Name',
        };
    
        // Map the array and transform each object
        const transformedArray:any = this.designation.map((obj:any) => {
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
    XLSX.writeFile(wb, 'designation.xlsx');
  }

  ngOnInit(): void {
    this.getplantcode()
    this.service.getdesignation().
      subscribe({
        next: (response) => { 
          console.log(response);
          this.designation = response 
          }
      })
  }

  getplantcode() {
    var company = { 'company_name': sessionStorage.getItem('companycode') }
    this.service.plantcodelist(company)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.plantname = response;
        },
        error: (error) => console.log(error),
      });
  }

  get_slno(event: any) {
    console.log(this.form.value);
  }

  open(content: any) {
    this.form.reset();
    this.editing_flag = false

    console.log("opening")
    this.modalService.open(content, { centered: true })
  }
  opentoedit(content: any) {
    console.log("opening")
    this.modalService.open(content, { centered: true })
  }


  edit(a: any) {
    this.temp_a = a
    this.editing_flag = true
    this.form.controls['slno'].setValue(this.designation[a].slno)
    this.form.controls['desig_name'].setValue(this.designation[a].desig_name)
    this.form.controls['names'].setValue(this.designation[a]?.plant_name)
    this.form.controls['plant_name'].setValue(this.designation[a]?.plant_code)
    this.form.get('plant_name').disable()
  }
  save() {
    console.log(this.form.value)
    this.service.adddesignation(this.form.value)
      .subscribe({
        next: (response: any) => {
          console.log(response);

          const index = this.plantname.findIndex((obj: any) => obj.plant_code === this.form.get('plant_name').value);
          this.form.get('plant_code').setValue(this.form.get('plant_name').value)
          this.form.get('plant_name').setValue(this.plantname[index].plant_name)
          this.service.getdesignation().
            subscribe({
              next: (response) => { console.log(response);
                 this.designation = response }
            })
          this.form.reset()
        }
      })

  }
  editSave() {
    this.form.get('plant_name').enable()

    this.service.updatedesignation(this.form.value)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.message == 'updated') {
            const index = this.plantname.findIndex((obj: any) => obj.plant_code === this.form.get('plant_name').value);
            this.form.get('plant_code').setValue(this.form.get('plant_name').value)
            this.form.get('plant_name').setValue(this.plantname[index].plant_name)

            this.service.getdesignation().
              subscribe({
                next: (response) => { console.log(response);
                   this.designation = response }
              })
          }
        }
      })
  }
  /////////////////////////////////////////////////////edit functions

  delete(a: any, slno: any) {
    this.service.deletedesignation({ slno: slno })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.message == 'success')
            this.designation.splice(a, 1)
        }
      })
  }




  reset() {
    this.form.reset()
  }
}
