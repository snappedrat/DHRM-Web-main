import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,UntypedFormControl,Validator, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';

@Component({
    selector: 'app-family-detail',
    templateUrl: './family-detail.component.html',
    styleUrls: ['./family-detail.component.css']
})
export class FamilyDetailComponent implements OnInit {
    relation :any = ['Father','Mother','Sister','Brother'];
    dependent_self :any = ['Dependant','Self-sufficient'];
    fg : FormGroup
    constructor(private fb:FormBuilder, private http: HttpClient, private cookie:CookieService, private plantcodeService : PlantcodeService
        ) {
        this.fg = this.fb.group({
            family:this.fb.array([])
        })
        this.AddRow();
    }
    get familyArray()
    {
        return this.fg.get('family') as FormArray;
    }
    AddRow()
    {

        const familyGroup = this.fb.group({
            name:['',[Validators.required]],
            relation:['',[Validators.required]],
            age:['',[Validators.required]],
            occupation:['',[Validators.required]],
            contactNumber:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            dependent_self:['',[Validators.required]],
            mobilenumber : new UntypedFormControl(this.cookie.get('mobilenum'))
        })
        this.familyArray.push(familyGroup);
        console.log(
            this.familyArray.controls
        );
    }
    onSubmit()
    {
        // console.log(this.fg.value)
        console.log(this.familyArray.value)
        if(this.familyArray.value.length == 0){
            console.log("good");
          }
          else{
            this.plantcodeService.submitfamily()
          }
    }
    sendData(){
        this.plantcodeService.fam = this.familyArray.value
    } 
    ngOnInit(): void {
    }
    delRow(index:number)
    {
        this.familyArray.removeAt(index);
    }
}
