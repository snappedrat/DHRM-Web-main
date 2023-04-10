import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonPermission implements CanActivate {
  constructor(private router: Router, private location: Location) {
  }

  canActivate(): boolean {
    if(!(sessionStorage.getItem('istrainee') == 'false'))
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
export class SkillDevHR implements CanActivate {
  constructor(private router: Router, private location: Location) {
  }

  canActivate(): boolean {
    if(!(sessionStorage.getItem('istrainer') == 'true') && !(sessionStorage.getItem('ishr') == 'true') && !(sessionStorage.getItem('ishraapr') == 'true') )
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
  export class SkillDevSupervisor implements CanActivate {
    constructor(private router: Router, private location: Location) {
    }
  
    canActivate(): boolean {
      const item = sessionStorage.getItem("all");
  
      if (item !== null) 
      {
      var all = JSON.parse(item);
      }
  
      var isRA = all.Is_ReportingAuth
      
      if(!isRA)
      {
        alert('Not accessible')
        this.location.back()
        return false;
      }
      return true;
    }
  }