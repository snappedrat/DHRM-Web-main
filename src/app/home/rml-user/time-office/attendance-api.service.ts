import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { sample } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendanceApiService {

  constructor(private http:HttpClient) {

  }
   date = new Date();
   year = this.date.getFullYear();
   month = this.date.getMonth();
    sample(year: any, month: any){
      return this.http.post('http://localhost:3000/logins', year, month);
  }
}