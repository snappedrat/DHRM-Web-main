import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PlantcodeService } from '../../plantcode.service';
import { leadingComment } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-familyedit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.css']
})
export class FamilyEditComponent implements OnInit {

relation: any = ['Father', 'Mother', 'Brother', 'Sister', 'Son', 'Daughter']
dependent: any = ['Dependent', 'Self-Sufficient']
mobile: any
family : any = []
mobile_no1:any =
  {
    "mobile" : this.active.snapshot.paramMap.get('mobile_no1')
  }


familyData = [
  {
    'sno':'1',
    'name': '',
    'relation': '',
    'age': '',
    'occupation': '',
    'contactnumber': '',
    'dependent': '',
    'mobile': this.active.snapshot.paramMap.get('mobile_no1')
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

  constructor(private http: HttpClient, private cookie: CookieService, private plantcodeService: PlantcodeService, private active :ActivatedRoute ) {
    this.mobile = this.active.snapshot.paramMap.get('mobile_no1')
   }

  ngOnInit(): void {

    this.plantcodeService.getdatafamily(this.mobile_no1)
    setTimeout(() => {
      this.family = this.plantcodeService.family
      console.log('====================================');
      console.log(this.family);
      console.log('====================================');
      this.familyData[0].name = this.family[0]?.relation_name1
      this.familyData[0].relation = this.family[0]?.relation_type1
      this.familyData[0].age = this.family[0]?.age1
      this.familyData[0].occupation = this.family[0]?.occupation1
      this.familyData[0].contactnumber = this.family[0]?.contact_number1
      this.familyData[0].dependent = this.family[0]?.dependent1
      
      this.familyData[1].name = this.family[0]?.relation_name2
      this.familyData[1].relation = this.family[0]?.relation_type2
      this.familyData[1].age = this.family[0]?.age2
      this.familyData[1].occupation = this.family[0]?.occupation2
      this.familyData[1].contactnumber = this.family[0]?.contact_number2
      this.familyData[1].dependent = this.family[0]?.dependent2

      this.familyData[2].name = this.family[0]?.relation_name3
      this.familyData[2].relation = this.family[0]?.relation_type3
      this.familyData[2].age = this.family[0]?.age3
      this.familyData[2].occupation = this.family[0]?.occupation3
      this.familyData[2].contactnumber = this.family[0]?.contact_number3
      this.familyData[2].dependent = this.family[0]?.dependent3

      this.familyData[3].name = this.family[0]?.relation_name4
      this.familyData[3].relation = this.family[0]?.relation_type4
      this.familyData[3].age = this.family[0]?.age4
      this.familyData[3].occupation = this.family[0]?.occupation4
      this.familyData[3].contactnumber = this.family[0]?.contact_number4
      this.familyData[3].dependent = this.family[0]?.dependent4
      this.sendData()
    }, 1000);
    this.sendData()
  }  
  submit(){
    console.log('family', this.familyData);
      if(this.familyData.length == 0){
      console.log("good");
      }
      else{
      this.plantcodeService.submitfamily()
    }
}

sendData(){
  this.plantcodeService.fam = this.familyData
} 

}
