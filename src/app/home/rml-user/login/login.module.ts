import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginRoutingModule} from "./login-routing.module";
import {MastersRoutingModule} from "../masters/masters-routing.module";

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        MastersRoutingModule
    ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
    ]
})
export class LoginModule { }
