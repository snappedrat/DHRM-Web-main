import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate{
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'profains_auth'
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private apiService: ApiService, private router:Router) {
    const token = sessionStorage.getItem(this.TOKEN_NAME);
    this._isLoggedIn$.next(!!token);
  }

  login(User_Name: string, Password: string) {
    return this.apiService.login(User_Name, Password).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        sessionStorage.setItem('profanis_auth', response.token);
      })
    );
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

  canActivate(): boolean {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  }
