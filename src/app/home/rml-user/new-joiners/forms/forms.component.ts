import { Component, OnInit } from '@angular/core';
import { BanksComponent } from './banks/banks.component';
import { BasicComponent } from './basic/basic.component';
import { EducationalComponent } from './educational/educational.component';
import { EmergencyComponent } from './emergency/emergency.component';
import { FamilyDetailComponent } from './family-detail/family-detail.component';
import { LanguageComponent } from './language/language.component';
import { OtherComponent } from './other/other.component';
import { PrevComponent } from './prev/prev.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  // constructor(private banks : BanksComponent, private basic: BasicComponent, private education: EducationalComponent, private emer: EmergencyComponent, private family : FamilyDetailComponent, private lang: LanguageComponent,private other: OtherComponent, private prev : PrevComponent)
  //  { }

  // allSave(){
  //     // this.banks.submit()
  //     // this.basic.submit()
  //     // this.education.onSubmit()
  //     // this.emer.submit()
  //     // this.family.onSubmit()
  //     // // this.lang.ngOnInit()
  //     // this.other.submit()
  //     // this.prev.onSubmit()

  // }

  ngOnInit(): void {
  }

}
