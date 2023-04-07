import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './masters-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { LoadModule } from 'src/app/loader/loader.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MastersRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    LoadModule
  ],
  providers:[CookieService],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MastersModule { }
