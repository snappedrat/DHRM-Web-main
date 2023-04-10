import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/home/Guards/Auth.guard';
import {LoginComponent} from "./login.component";

const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
