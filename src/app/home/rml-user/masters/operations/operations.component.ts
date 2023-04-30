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
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OperationsComponent implements OnInit {
  closeResult: string;

  form:any

  sample : any = environment.path

  plantname:any
  type = ['YES', 'NO']

  dummy: any = [

  ]
  editing_flag: any;
  temp_a: any;
  array: any = [];
  index: number = -1;
  is_admin:any = sessionStorage.getItem('isadmin')

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService,public loader:LoaderserviceService) {
    this.form = this.fb.group({
      oprn_slno: [''],
      plant_name :[''],
      oprn_desc : [''],
      critical_oprn: [''],
      skill_level: [''],
          
    })
   }

  ngOnInit(): void {

    this.getplantcode()
    this.service.getoperation().
    subscribe({
      next: (response)=>{this.dummy = response}
    })
  }

  getplantcode(){
    var company = {'company_name': sessionStorage.getItem('companycode')}
    this.service.plantcodelist(company)
    .subscribe({
      next: (response) =>{ console.log(response); 
        this.plantname = response ;
        for(var o in this.plantname)
        this.array.push(this.plantname[o].plant_name)
      },
      error: (error) => console.log(error),
    });
  }

  open(content:any)
  {
    this.form.reset();

    this.editing_flag = false
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  save()
  {
    if(this.is_admin == 'true')
      this.form.get('plant_name').setValue(this.plantname[this.index].plant_code)
    else
      this.form.get('plant_name').setValue(sessionStorage.getItem('plantcode'))

    this.service.addoperation(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);

        this.service.getoperation().
        subscribe({
          next: (response)=>{this.dummy = response}
        })
        this.form.reset()
        this.index = -1
      }
    })    

  }
/////////////////////////////////////////////////////edit functions
  opentoedit(content:any)
  {
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  edit(a:any, slno:any)
  {
    this.form.get('plant_name').disable()
    this.editing_flag = true
    this.temp_a = a

    this.form.controls['plant_name'].setValue(this.dummy[a].plant_name)
    this.form.controls['oprn_slno'].setValue(slno)
    this.form.controls['oprn_desc'].setValue(this.dummy[a].oprn_desc)
    this.form.controls['skill_level'].setValue(this.dummy[a].skill_level)

    if(this.dummy[a].critical_oprn == true)
      this.form.controls['critical_oprn'].setValue('YES')
    else if(this.dummy[a].critical_oprn == false)
      this.form.controls['critical_oprn'].setValue('NO')
    console.log(this.form.value)

  }

  get_slno(event:any)
{
  this.index = event.target.value.split(':')[0]-1
}

  editSave()
  {
    this.form.get('plant_name').enable()

    console.log(this.form.value)

    this.service.updateoperation(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
      if(response.message == 'updated')
      {
 
        console.log(this.form.value)        
        this.service.getoperation().
        subscribe({
          next: (response)=>{this.dummy = response}
        })
      }
      }
    })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any, slno:any)
{
  this.service.deleteoperation({slno : slno})
  .subscribe({
    next: (response:any) =>{console.log(response); 
    if(response.message == 'success')
      this.dummy.splice(a,1)
  }
  })
}

exportexcel(): void
{

  const newKeys:any = {
    oprn_slno: 'Slno',
    plant_name: 'Plant Name',
    oprn_desc: 'Descriptions',
    line_code: 'Line Code',
    skill_level: 'Skill Level',
    critical_oprn: 'Critical Operation',
    plant_code: 'Plant Code'
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
  XLSX.writeFile(wb, 'operations.xlsx');
}

reset()
{
  this.form.reset()
}

}
