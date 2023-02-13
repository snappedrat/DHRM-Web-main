import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    console.log('------------------------------------------------')
    if(!sessionStorage.getItem('user'))
    {
      alert('Please Login Properly !!!!!!!')
      this.router.navigate(['/first']);
      return false;
    }
    // else if (sessionStorage.getItem('user')=='emp2') {
    //   this.router.navigate(['/trainee-application']);
    //   return false;
    // }
    // else if (sessionStorage.getItem('user')=='test') {
    //   this.router.navigate(['/trainee-login']);
    //   return false;
    // }
    // else if(sessionStorage.getItem('user')=='emp')
    // {
    //   this.router.navigate(['/rml/login']);
    //   return false;
    // }
    return true;
  }
}