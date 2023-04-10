import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, Validators, FormBuilder, UntypedFormGroup, UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import { PlantcodeService } from '../new-joiners/plantcode.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  ishrappr :any
  form: FormGroup = new FormGroup({});
  ishr: any 
  istrainer:any
  istrainee:any
  istou:any
  isadmin:any
  a : any
  username :any = {
    "username": sessionStorage.getItem('user_name'),
    "user": sessionStorage.getItem('user')
  }
  showname:any = ''
  showid : any = ''

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  showdept: string | null;
  showplant: string | null;
  issupervisor: string | null;
  all: any;
  isRA: string | null;
  user: any;
  access_master: string | null;

  constructor(private fb : FormBuilder, private breakpointObserver: BreakpointObserver, private cookie: CookieService, private http: HttpClient, private service : ApiService, private active : ActivatedRoute ) {
    this.form = fb.group({
        username : new UntypedFormControl(sessionStorage.getItem('user_name'))
    })
  }
      delCookie()
      {
        this.user = sessionStorage.getItem('user')
        this.cookie.delete('User_Name')
        this.cookie.delete('Password')
        sessionStorage.clear()
      }

      ngOnInit(): void 
      {
        this.getHr()
      }

getHr()
{
  this.service.getHr(this.username)
  .subscribe({

    next: (response) => 
    {
      console.log(response); this.ishrappr = response;;

      sessionStorage.setItem("all", JSON.stringify(this.ishrappr[0]))


      sessionStorage.setItem('ishr', this.ishrappr[0]?.Is_HR)
      sessionStorage.setItem('ishrappr', this.ishrappr[0]?.Is_HRAppr)
      sessionStorage.setItem('istrainer', this.ishrappr[0]?.Is_Trainer)
      sessionStorage.setItem('issupervisor', this.ishrappr[0]?.Is_Supervisor)
      sessionStorage.setItem('access_master', this.ishrappr[0]?.access_master)

      if(this.username.user == 'emp')
          sessionStorage.setItem('istrainee', this.ishrappr[0]?.is_trainee)
      else
          sessionStorage.setItem('istrainee', 'true')

      sessionStorage.setItem('isadmin', this.ishrappr[0]?.is_admin)
      sessionStorage.setItem('istou', this.ishrappr[0]?.Is_TOU)
      sessionStorage.setItem('plantcode', this.ishrappr[0]?.plant_code)

      if(this.username.user == 'emp')
        sessionStorage.setItem('emp_name', this.ishrappr[0]?.Emp_Name)
      else
        sessionStorage.setItem('emp_name', this.ishrappr[0]?.fullname)

      sessionStorage.setItem('dept_name', this.ishrappr[0]?.dept_name)
      sessionStorage.setItem('plant_name', this.ishrappr[0]?.plant_name)
      sessionStorage.setItem('emp_id', this.ishrappr[0]?.empl_slno)

      this.getitems()
  },
    error: (error) => console.log(error),
});

}

getitems()
{
  const item = sessionStorage.getItem("all");

if (item !== null) {
  this.all = JSON.parse(item);
}
  this.isRA = this.all.Is_ReportingAuth
  console.log(this.isRA)

  this.ishr = sessionStorage.getItem('ishr')
  this.ishrappr = sessionStorage.getItem('ishrappr')
  this.istrainer = sessionStorage.getItem('istrainer')
  this.istrainee = sessionStorage.getItem('istrainee')
  this.access_master = sessionStorage.getItem('access_master')
  this.showid = sessionStorage.getItem('user_name')
  this.showname = sessionStorage.getItem('emp_name')
  this.showdept = sessionStorage.getItem('dept_name')
  this.showplant = sessionStorage.getItem('plant_name')
  this.isadmin = sessionStorage.getItem('isadmin')
  this.istou = sessionStorage.getItem('istou')
  this.issupervisor =   sessionStorage.getItem('issupervisor')



}

}


