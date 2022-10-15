import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, Validators, FormBuilder, UntypedFormGroup, UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import { PlantcodeService } from '../new-joiners/plantcode.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit{

  ishrappr :any
  form: FormGroup = new FormGroup({});
  ishr: any 
  a : any
  username :any = {
    "username": localStorage.getItem('user_name')
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private fb : FormBuilder, private breakpointObserver: BreakpointObserver, private cookie: CookieService, private http: HttpClient, private service : PlantcodeService, private active : ActivatedRoute ) {
    this.form = fb.group({
        username : new UntypedFormControl(localStorage.getItem('user_name'))
    })
  }
      delCookie()
      {
        this.cookie.delete('User_Name')
        this.cookie.delete('Password')
        localStorage.clear()
      }

      ngOnInit(): void 
      {
        this.getHr()
      }

getHr()
{
  console.log(this.username)
  console.log(this.active.snapshot.paramMap.get('username'))
  this.service.getHr(this.username)
  setTimeout(() => {
    
  this.ishr = localStorage.getItem('ishr')
  this.ishrappr = localStorage.getItem('ishrappr')
  console.log('====================================');
  console.log(this.ishr,this.ishrappr);
  console.log('====================================');  
  }, 1000);


}

}
