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
  pretest(formvalue:any)
  {
    return this.http.post('http://localhost:3000/pretest',formvalue)
  }
  posttest(formvalue:any)
  {
    return this.http.post('http://localhost:3000/posttest',formvalue)
  }
  questionbank(formvalue:any)
  {
    return this.http.post('http://localhost:3000/questionbank',formvalue)
  }
  questionbankupload(formvalue:any)
  {
    return this.http.post('http://localhost:3000/questionbankupload',formvalue)
  }
  getTrainee()
  {
    var plantcode = {'plantcode' : sessionStorage.getItem('plantcode')}
    return this.http.post('http://localhost:3000/getTrainee', plantcode)
  }
  getOfflineModules()
  {
      var plantcode = {'plantcode' : sessionStorage.getItem('plantcode')}
      return this.http.post('http://localhost:3000/getOfflineModule', plantcode)
  }

  offlineUpload(formvalue:any)
  {
    return this.http.post('http://localhost:3000/offlineUpload', formvalue)
  }
  addmodule(formvalue:any)
  {
    return this.http.post('http://localhost:3000/addmodule', formvalue)
  }
  updatemodule(formvalue:any)
  {
    return this.http.post('http://localhost:3000/updatemodule', formvalue)
  }
  deletemodule(formvalue:any)
  {
    return this.http.post('http://localhost:3000/deletemodule', formvalue)
  }
}