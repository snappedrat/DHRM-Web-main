import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if(!sessionStorage.getItem('user'))
    {
      alert('Please Login Properly !!!!!!!')
      this.router.navigate(['/first']);
      return false;
    }
    return true;
  }
}