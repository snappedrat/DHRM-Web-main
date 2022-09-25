import { Component, OnInit } from '@angular/core';
import { PlantcodeService } from '../plantcode.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  bankdata :any
  basicData: any
  eduData: any
  emerData: any
  famData: any
  otherData: any
  prevData: any

  constructor(private formservice: PlantcodeService, private http: HttpClient ){

  }

  allSave()
  {
    // this.formservice.submitbank()
    // console.log(this.formservice.bank)

    // this.formservice.submitbasic()
    // console.log(this.formservice.basic)

    this.formservice.submitedu()
    console.log(this.formservice.edu)  

    // this.formservice.submitemer()
    // console.log(this.formservice.emer)    

    this.formservice.submitfamily()
    console.log(this.formservice.fam) 

    // this.formservice.submitother()
    // console.log(this.formservice.other) 

    this.formservice.submitprev()
    console.log(this.formservice.prev) 

    this.formservice.sumbitlang()
    console.log(this.formservice.lang) 
  }

    // this.basicData = this.formservice.basic
    // this.http
    //     .post('http://localhost:3000/basicforms', this.basicData)
    //     .subscribe({
    //         next: (response) => console.log(response),
    //         error: (error) => console.log(error),
    //     });

    // this.eduData = this.formservice.edu
    // this.http
    //     .post('http://localhost:3000/edu', this.eduData)
    //     .subscribe({
    //         next: (response) => console.log(response),
    //         error: (error) => console.log(error),
    //     });

    // this.emerData = this.formservice.basic
    // this.http
    //     .post('http://localhost:3000/emergency', this.emerData)
    //     .subscribe({
    //         next: (response) => console.log(response),
    //         error: (error) => console.log(error),
    //     });

    // this.famData = this.formservice.fam
    // this.http
    //     .post('http://localhost:3000/family', this.famData)
    //     .subscribe({
    //         next: (response) => console.log(response),
    //         error: (error) => console.log(error),
    //     });

    // this.otherData = this.formservice.other
    // this.http
    //     .post('http://localhost:3000/others', this.otherData)
    //     .subscribe({
    //         next: (response) => console.log(response),
    //         error: (error) => console.log(error),
    //     });
    
    // this.prevData = this.formservice.prev
    // this.http
    //     .post('http://localhost:3000/prev', this.prevData)
    //     .subscribe({
    //         next: (response) => console.log(response),
    //         error: (error) => console.log(error),
    //     });
    

  ngOnInit(): void {
  }
}