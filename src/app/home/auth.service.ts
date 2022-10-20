import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'profains_auth'
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private apiService: ApiService) {
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
}