import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
// import { ProductModel } from './models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

url:any = environment.path

  constructor(private http: HttpClient) {}

  login(User_Name: string, Password: string) {
    return this.http.post(this.url+'/logins', { User_Name, Password });
  }

  traineeLogin(formvalue:any)
  {
    return this.http.post(this.url+'/traineelogin',formvalue)
  }
  getModules(username:any)
  {
    return this.http.post(this.url+'/getModules', username)
  }
  getQuestions(formvalue:any)
  {
    return this.http.post(this.url+'/getQuestions',formvalue)
  }
  getTest(formvalue:any)
  {
    return this.http.post(this.url+'/getTest',formvalue)
  }
  Qualified(formvalue:any)
  {
    return this.http.post(this.url+'/Qualified',formvalue)
  }
  pretest(formvalue:any)
  {
    return this.http.post(this.url+'/pretest',formvalue)
  }
  posttest(formvalue:any)
  {
    return this.http.post(this.url+'/posttest',formvalue)
  }
  questionbank(formvalue:any)
  {
    return this.http.post(this.url+'/questionbank',formvalue)
  }
  questionbankupload(formvalue:any)
  {
    return this.http.post(this.url+'/questionbankupload',formvalue)
  }
  getTrainee()
  {
    var plantcode = {'plantcode' : sessionStorage.getItem('plantcode')}
    return this.http.post(this.url+'/getTrainee', plantcode)
  }
  getOfflineModules()
  {
      var plantcode = {'plantcode' : sessionStorage.getItem('plantcode')}
      return this.http.post(this.url+'/getOfflineModule', plantcode)
  }

  offlineUpload(formvalue:any)
  {
    return this.http.post(this.url+'/offlineUpload', formvalue)
  }
  addmodule(formvalue:any)
  {
    return this.http.post(this.url+'/addmodule', formvalue)
  }
  updatemodule(formvalue:any)
  {
    return this.http.post(this.url+'/updatemodule', formvalue)
  }
  deletemodule(formvalue:any)
  {
    return this.http.post(this.url+'/deletemodule', formvalue)
  }
  testSummary(formvalue:any)
  {
    return this.http.post(this.url+'/testSummary', formvalue)
  }
  traineeScorecard(formvalue:any)
  {
    return this.http.post(this.url+'/traineeScorecard', formvalue)
  }
  traineeAnswers(formvalue:any)
  {
    return this.http.post(this.url+'/traineeAnswers', formvalue)
  }
}