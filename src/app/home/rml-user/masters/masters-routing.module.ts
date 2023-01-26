import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from "./company/company.component";
import { DeptComponent } from "./dept/dept.component";
import { PlantComponent } from './plant/plant.component';
import { LineComponent } from './line/line.component';
import { DesignationComponent } from './designation/designation.component';
import { TraineecategoryComponent } from './traineecategory/traineecategory.component';
import { UserComponent } from './user/user.component';
import { BankComponent } from './bank/bank.component';
import { OperationsComponent } from './operations/operations.component';
import { PincodeComponent } from './pincode/pincode.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShiftComponent } from './shift/shift.component';

const routes: Routes = [
  {
    path: "company",
    component: CompanyComponent
  },
  {
    path: "dept",
    component: DeptComponent
  },
  {
    path: "plant",
    component: PlantComponent
  },
  {
    path: "line",
    component: LineComponent
  },
  {
    path: "designation",
    component: DesignationComponent
  },
  {
    path: "bank",
    component: BankComponent
  },
  {
    path: "trainee-category",
    component: TraineecategoryComponent
  },
  {
    path: "user",
    component: UserComponent
  },
  {
    path: "operations",
    component: OperationsComponent
  },
  {
    path: "pincode",
    component: PincodeComponent
  },
  {
    path: "employees",
    component: EmployeeComponent
  },
  {
    path: "shift",
    component: ShiftComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
