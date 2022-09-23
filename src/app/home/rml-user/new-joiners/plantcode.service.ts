import { Injectable } from '@angular/core';
import { User } from '../masters/user/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantcodeService {

    constructor(private http: HttpClient){

    }
    plantCodeList(){
      console.log('====================================');
      console.log('service');
      console.log('====================================');
      this.http.post('http://localhost:3000/plantcodelist', '')
      .subscribe({
        next: (response) =>{ console.log(response); },
        error: (error) => console.log(error),
      });
      // .subscribe({
      //   next: (response) =>{ console.log(response); list=response},
      //   error: (error) => console.log(error),
      // });
    }
}
