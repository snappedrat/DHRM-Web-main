import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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

  traineeLogin(formvalue:any)
  {
    return this.http.post('http://localhost:3000/traineelogin',formvalue)
  }
  getModules(username:any)
  {
    return this.http.post('http://localhost:3000/getModules', username)
  }
  getQuestions(formvalue:any)
  {
    return this.http.post('http://localhost:3000/getQuestions',formvalue)
  }
  getTest(formvalue:any)
  {
    return this.http.post('http://localhost:3000/getTest',formvalue)
  }
  Qualified(formvalue:any)
  {
    return this.http.post('http://localhost:3000/Qualified',formvalue)
  }
}