import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { ProductModel } from './models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(User_Name: string, Password: string) {
    return this.http.post('http://localhost:3000/logins', { User_Name, Password });
  }
  traineeLogin(formvalue:any){
    return this.http.post('http://localhost:3000/traineelogin',formvalue)
    }
}