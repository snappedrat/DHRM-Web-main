import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class isHr implements CanActivate{
  constructor(private router: Router, private location: Location) {
  }

  canActivate(): boolean {
    if(!(sessionStorage.getItem('ishr') == 'true'))
    {
      alert('Not accessible')
      this.location.back()
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class isHrAppr implements CanActivate{
  constructor(private router: Router, private location: Location) {
  }

  canActivate(): boolean {
    if(!(sessionStorage.getItem('ishrappr') == 'true'))
    {
      alert('Not accessible')
      this.location.back()
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class HrPermission implements CanActivate{
  constructor(private router: Router, private location: Location) {
  }

  canActivate(): boolean {
    if(!(sessionStorage.getItem('ishrappr') == 'true') && !(sessionStorage.getItem('ishr') == 'true'))
    {
      alert('Not accessible')
      this.location.back()
      return false;
    }
    return true;
  }
}
