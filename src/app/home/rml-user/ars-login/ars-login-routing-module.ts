import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Auth.guard';
import { ArsLoginComponent } from './ars-login.component';

const routes: Routes = [
    {
        path:'ars-login',
        component:ArsLoginComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
