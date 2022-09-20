import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css']
})
export class EmergencyComponent  {
relations :any = ['Father','Mother','Sister','Brother'];
 form: FormGroup = new FormGroup({});  
   constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactName:['',Validators.required],
      relations:['',Validators.required]
    })  
  }  

  get f(){  
    return this.form.controls;  
  }
  get r(){  
    return this.form.controls;  
  }

  get name(){  
    return this.form.controls;  
  }
 
submit(){
    console.log(this.form.value);
    let formData: any = new FormData();
    formData.append('contactName', this.form.get('contactName')!.value);
    formData.append('contactNumber', this.form.get('contactNumber')!.value);
    formData.append('relations', this.form.get('relations')!.value);
    this.http
        .post('http://localhost:3000/emergency', this.form.value)
        .subscribe({
            next: (response) => console.log(response),
            error: (error) => console.log(error),
        });
  }  
  
}
