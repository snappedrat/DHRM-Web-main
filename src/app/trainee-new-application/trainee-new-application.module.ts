import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraineeNewApplicationRoutingModule } from './trainee-new-application-routing.module';
import { FillFormComponent } from './fill-form/fill-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
<<<<<<< HEAD
import { BankComponent } from './fill-form/bank/bank.component';
import { BasicComponent } from './fill-form/basic/basic.component';
import { EducationalComponent } from './fill-form/educational/educational.component';
import { EmergencyComponent } from './fill-form/emergency/emergency.component';
import { FamilyDetailComponent } from './fill-form/family-detail/family-detail.component';
import { OtherComponent } from './fill-form/other/other.component';
import { PrevComponent } from './fill-form/prev/prev.component';
import { LanguageComponent } from './fill-form/language/language.component';
=======
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
>>>>>>> c9ff244fb4e381dc1c2cd2820e85ca9cf422907a


@NgModule({
  declarations: [
    FillFormComponent,
    LoginFormComponent,
<<<<<<< HEAD
    BankComponent,
    BasicComponent,
    EducationalComponent,
    EmergencyComponent,
    FamilyDetailComponent,
    OtherComponent,
    PrevComponent,
    LanguageComponent
=======
>>>>>>> c9ff244fb4e381dc1c2cd2820e85ca9cf422907a
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TraineeNewApplicationRoutingModule,

  ]

})
export class TraineeNewApplicationModule { }
