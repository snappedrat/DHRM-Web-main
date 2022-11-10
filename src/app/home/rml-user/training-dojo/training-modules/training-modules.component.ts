import {Component, OnInit, ViewChild, Injectable, ViewContainerRef, TemplateRef, NgModule, Inject,} from "@angular/core";
import {UntypedFormGroup, UntypedFormControl, UntypedFormBuilder,} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import * as XLSX from "xlsx";
import { MatSidenav } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { Observable, Subject } from "rxjs";
import { Options } from "selenium-webdriver";
import { Directive, Input } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl, FormGroup, Validators } from "@angular/forms";
const material = [MatSidenav, MatTableModule];
@Component({
  selector: 'app-training-modules',
  templateUrl: './training-modules.component.html',
  styleUrls: ['./training-modules.component.css']
})
export class TrainingModulesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
