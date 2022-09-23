import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validator, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-family-detail',
    templateUrl: './family-detail.component.html',
    styleUrls: ['./family-detail.component.css']
})
export class FamilyDetailComponent implements OnInit {
    relation :any = ['Father','Mother','Sister','Brother'];
    dependant_self :any = ['Dependant','Self-sufficient'];
    fg : FormGroup
    constructor(private fb:FormBuilder, private http: HttpClient) {
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
            dependant_self:['',[Validators.required]]
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
        this.http
            .post('http://localhost:3000/family', this.familyArray.value)
            .subscribe({
                next: (response) => console.log(response),
                error: (error) => console.log(error),
            })
    }
    ngOnInit(): void {
    }
    delRow(index:number)
    {
        this.familyArray.removeAt(index);
    }
}