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

}