import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { log } from 'console';
import { ApiService } from "src/app/home/api.service";
import { LoaderserviceService } from 'src/app/loaderservice.service';
import { environment } from "src/environments/environment.prod";
import * as XLSX from 'xlsx';

const material = [MatSidenav, MatTableModule];

@Component({
  selector: "app-plant",
  templateUrl: "./plant.component.html",
  styleUrls: ["./plant.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class PlantComponent implements OnInit {
  closeResult: string;

  form:any
  file:any
  new:any
  company:any
  companylist:any

  sample : any = environment.path+'/plant/'

  dummy: any = []
  editing_flag: any;
  sign:any = null
  inx: any;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService,public loader: LoaderserviceService) {
    this.form = this.fb.group({
      sno:[''],
      plant_code :['', Validators.required],
      plant_name : ['', Validators.required],
      pl : ['', Validators.required], 
      addr : ['', Validators.required],
      locatn : ['', Validators.required],
      plant_sign : [''],
      personal_area : ['', Validators.required],
      payroll_area:['', Validators.required],
      company_code:['', Validators.required]
     
    })
   }

  ngOnInit(): void {
    this.service.getplant().
    subscribe({
      next: (response)=>{this.dummy = response}
    })
    this.service.getCompanyCode()
    .subscribe({
      next: (response)=>{
        console.log(response)
        this.companylist = response;
      }
    })
  }

  open(content:any)
  {
    this.sign = null
    this.form.reset();
    this.editing_flag = false
    this.form.get('company_code').enable()
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  save()
  {
    this.form.controls['plant_sign'].setValue(this.form.controls['plant_code'].value+'_sign.'+this.new)
    console.log(this.form.value)

    this.service.addplant(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);
      if(response.message == 'already')
      {
        alert('plant with code value already exists')
      }
    else
      {
        console.log(this.form.value)
        this.service.getplant().
        subscribe({
          next: (response)=>{this.dummy = response}
        })
        this.form.reset()
      }}
    })    
  }
  getValue(event:any)
  {
    console.log(this.form.value);
  }
/////////////////////////////////////////////////////edit functions
  opentoedit(content:any)
  {
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }

  edit(a:any)
  {      
    this.editing_flag = true
    this.form.get('company_code').disable()
    this.form.controls['sno'].setValue(a)
    this.form.controls['company_code'].setValue(this.dummy[a]?.company_code)    
    this.form.controls['plant_code'].setValue(this.dummy[a].plant_code)
    this.form.controls['plant_name'].setValue(this.dummy[a].plant_name)
    this.form.controls['pl'].setValue(this.dummy[a].pl)
    this.form.controls['addr'].setValue(this.dummy[a].addr)
    this.form.controls['locatn'].setValue(this.dummy[a].locatn)
    this.form.controls['personal_area'].setValue(this.dummy[a].personal_area)
    this.form.controls['payroll_area'].setValue(this.dummy[a].payroll_area)
    console.log(this.form.value);
    this.sign = this.dummy[a].plant_sign
    console.log(this.sign);
    

  }

  editSave()
  {
    this.form.controls['plant_sign'].setValue(this.form.controls['plant_code'].value+'_sign.'+this.new)
    console.log(this.form.value)
    this.service.updateplant(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
      if(response.message== 'already')
      {
        alert('plant with code already exists')
      }
    else
      {
        this.service.getplant().
        subscribe({
          next: (response)=>{this.dummy = response}
        })
      }}
    })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any)
{
  this.service.deleteplant(this.dummy[a])
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
    plant_code: 'Plant Code',
    plant_name: 'Plant Name',
    pl: 'Plant Short Name',
    addr: 'Address',
    locatn: 'Location',
    personal_area: 'Personal Area',
    payroll_area: 'Payroll Area',
    company_name: 'Company Name',
    company_code: 'Company Code',
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
  XLSX.writeFile(wb, 'plant_master.xlsx');
}

reset()
{
  this.form.reset()
}

upload(event:any)
{
  this.file = event.target.files[0]
	var file_local = this.file?.name.split('.')
	this.new = file_local?.pop()

  var formData = new FormData()

  formData.append("file", event.target.files[0], this.form.controls['plant_code'].value+'_sign.'+this.new )
  this.sign = this.form.controls['plant_code'].value+'_sign.'+this.new
  this.service.plantupload(formData)
  .subscribe(
    {
      next: (res)=>{
        console.log(res)
      },
      error: (err=>{
        console.log(err)
      }
      )
    }
  )

}

}


