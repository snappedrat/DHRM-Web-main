import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, Validators, FormBuilder, UntypedFormGroup, UntypedFormBuilder, UntypedFormControl} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit{

  

  ishrappr :any = []
  form: FormGroup = new FormGroup({});
  ishr: any  = []
  a : any

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private fb : FormBuilder, private breakpointObserver: BreakpointObserver, private cookie: CookieService, private http: HttpClient) {
    this.form = fb.group({
        username : new UntypedFormControl(localStorage.getItem('user_name'))
    })
  }
      delCookie()
      {
        this.cookie.delete('User_Name')
        this.cookie.delete('Password')
      }

      ngOnInit(): void {
        console.log(this.form.value)
        this.getHr()
      }

      getHr(){
        this.http.post('http://localhost:3000/gethr',this.form.value)
        .subscribe({
          next: (response) => {console.log(response); this.ishr = response},
          error: (error) => console.log(error),
    });
    localStorage.setItem('ishr', this.ishr[0]?.Is_HR)
        this.http.post('http://localhost:3000/gethrappr',this.form.value)
            .subscribe({
              next: (response) => {console.log(response); this.ishrappr = response},
              error: (error) => console.log(error),
        });
    localStorage.setItem('ishrappr', this.ishrappr[0]?.Is_HRAppr)
      }

      setlocal(){
        localStorage.setItem('ishr', this.ishr)
        localStorage.setItem('ishrappr', this.ishrappr)
      }
}
