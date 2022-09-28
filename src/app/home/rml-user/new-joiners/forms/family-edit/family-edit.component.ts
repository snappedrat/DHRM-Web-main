import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { leadingComment } from '@angular/compiler';

@Component({
  selector: 'app-familyedit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.css']
})
export class FamilyEditComponent implements OnInit {

relation: any = ['Father', 'Mother', 'Brother', 'Sister', 'Son', 'Daughter']
dependent: any = ['Dependent', 'Self-Sufficient']

familyData = [
  {
    'sno':'1',
    'name': '',
    'relation': '',
    'age': '',
    'occupation': '',
    'contactnumber': '',
    'dependent': ''
  },
  {
    'sno':'2',
    'name': '',
    'relation': '',
    'age': '',
    'occupation': '',
    'contactnumber': '',
    'dependent': ''
  },
  {
    'sno':'3',
    'name': '',
    'relation': '',
    'age': '',
    'occupation': '',
    'contactnumber': '',
    'dependent': ''
  },
  {
    'sno':'4',
    'name': '',
    'relation': '',
    'age': '',
    'occupation': '',
    'contactnumber': '',
    'dependent': ''
  },
];

  constructor(private http: HttpClient, private cookie: CookieService, private plantcodeService: PlantcodeService ) { }

  ngOnInit(): void {
  }  
  submit(){
    console.log('family', this.familyData);
      if(this,this.familyData.length == 0){
      console.log("good");
      }
      else{
      this.plantcodeService.submitfamily()
    }
}

sendData(){
  this.plantcodeService.fam = this.familyData
} 

//     this.http.
//     post('http://localhost:3000/lang', this.languageList)
//     .subscribe({
//       next: (response) => console.log(response),
//       error: (error) => console.log(error),
//   })
// }
}
