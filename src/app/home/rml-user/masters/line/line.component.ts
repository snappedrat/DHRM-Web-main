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
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
  encapsulation:ViewEncapsulation.None,
})

export class LineComponent implements OnInit {
  closeResult: string;

  form:any

  sample : any = environment.path
  array :any = []
  array2 :any = []

  line: any = []
  editing_flag: any;
  plantname: any;
  dept:any
  all_details:any
  temp_a: any;
  index: any = -1;

  constructor(private fb : UntypedFormBuilder, private modalService : NgbModal, private service : ApiService,public loader:LoaderserviceService) {
    this.form = this.fb.group({
      plant_code:[''],
      plant_name: [''],
      dept_name: [''],
      Line_Name:[''],
      Line_code: [''],
      personal_subarea:[''],
      modified_by: [''],
      created_by: [''],     
      module_code: ['']
    })
   }

  

  exportexcel(): void
{
  var ws = XLSX.utils.json_to_sheet(this.line);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'line.xlsx');
}

ngOnInit(): void {
  this.getplantcode()
  var plantcode:any = {plantcode: sessionStorage.getItem('plantcode')}
  this.service.getline(plantcode).
  subscribe({
    next: (response)=>{console.log(response);this.line = response;

     }
  })
}

getplantcode(){
  var company = {'company_name': sessionStorage.getItem('companycode')}
  this.service.plantcodelist(company)
  .subscribe({
    next: (response) =>{ console.log(response); this.plantname = response },
    error: (error) => console.log(error),
  });
}

getall(event:any)
{
  console.log(event.target.value)
  this.index = event.target.value.split(':')[0]-1
  var plantcode = {plantcode: event.target.value.split(' ')[1]}
  this.form.get('plant_code').setValue(event.target.value.split(' ')[1])
    this.service.line_dept_design(plantcode)
    .subscribe({
      next: (response) =>{ console.log(response); 
        this.all_details = response;
        this.dept= this.all_details[1]
      },
      error: (error) => console.log(error),
    });
}

open(content:any)
  {
    this.form.get('plant_name').enable()
    this.form.get('dept_name').enable()
    this.editing_flag = false
    this.form.reset();
    console.log("opening")
    this.modalService.open(content, {centered: true})
  }
opentoedit(content:any)
  {

   console.log("editing")
    this.modalService.open(content, {centered: true})
  }

  get(event:any)
  {
    console.log(event.target.value)
  }
   
edit(a:any, slno:any)
  {
    this.editing_flag = true
    this.temp_a = a
    this.form.controls['Line_code'].setValue(slno)
    this.form.controls['plant_name'].setValue(this.line[a].plant_code)
    this.form.controls['Line_Name'].setValue(this.line[a].Line_Name)
    this.form.controls['personal_subarea'].setValue(this.line[a].personal_subarea)
    this.form.controls['plant_code'].setValue(this.line[a].plant_code)

    this.form.controls['modified_by'].setValue(sessionStorage.getItem('user_name'))
    this.form.get('plant_name').disable()
    this.form.get('dept_name').disable()
    console.log(this.line[a])
    var plantcode = {plantcode: this.line[a].plant_code}
    console.log(plantcode)

    this.service.line_dept_design(plantcode)
    .subscribe({
      next: (response) =>{ console.log(response); this.all_details = response;
        this.dept= this.all_details[1]
      },
      error: (error) => console.log(error),
    });
    this.form.controls['dept_name'].setValue(Number(this.line[a].module_code))

  }

save()
  {
    this.form.get('plant_name').setValue(this.plantname[this.index].plant_code)
    this.form.controls['created_by'].setValue(sessionStorage.getItem('user_name'))
    this.form.controls['module_code'].setValue(this.form.controls['dept_name'].value)

    const maxLineCode = this.line.reduce((prev:any, current:any) => {
      return (Number(prev.Line_code) > Number(current.Line_code)) ? prev : current;
    });


    this.form.controls['Line_code'].setValue( Number(maxLineCode.Line_code)+1)
    console.log(this.form.value)
    this.service.addline(this.form.value)
    .subscribe({
      next : (response:any)=>{console.log(response);
        if(response.message != 'failure')
        {
          const index = this.plantname.findIndex((obj:any) => obj.plant_code === this.form.get('plant_name').value);
          this.form.get('plant_name').setValue(this.plantname[index].plant_name)
          const index2 = this.dept.findIndex((obj:any) => obj.dept_slno === this.form.get('dept_name').value);
          this.form.get('dept_name').setValue(this.dept[index2].dept_name)
          this.line.push(this.form.value)
          this.form.reset()
        }

      }
    })    

  }
editSave()
  {
    this.form.get('plant_name').enable()
    this.form.get('dept_name').enable()
    this.form.controls['module_code'].setValue(this.form.controls['dept_name'].value)

    this.service.updateline(this.form.value)
    .subscribe({
      next: (response:any)=>{console.log(response);
      if(response.message != 'failure')
      {
        const index = this.plantname.findIndex((obj:any) => obj.plant_code === this.form.get('plant_name').value);
        this.form.get('plant_name').setValue(this.plantname[index].plant_name)
    
        const index2 = this.dept.findIndex((obj:any) => obj.dept_slno === this.form.get('dept_name').value);
        this.form.get('dept_name').setValue(this.dept[index2].dept_name)
        this.form.get('dept_name')
        this.line[this.temp_a] = this.form.value
      }
      console.log(this.form.value);

        }
    })
  }
/////////////////////////////////////////////////////edit functions

delete(a:any, slno:any)
{
  this.service.deleteline({slno : slno})
  .subscribe({
    next: (response:any) =>{console.log(response); 
    if(response.message == 'success')
      this.line.splice(a,1)
  }
  })
}




  reset()
{
  this.form.reset()
}
}
