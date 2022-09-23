import { Injectable } from '@angular/core';
import { User } from '../masters/user/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantcodeService {
  private upersons!: User[]

  getUsersFromData(): User[] {
    return this.upersons;

  }
    constructor(private http: HttpClient){

    }
    // plantCodeList(){
    //   console.log('====================================');
    //   console.log('service');
    //   console.log('====================================');
    //   this.http.post('http://localhost:3000/plantcodelist', '')
    //   .subscribe({
    //     next: (response) =>{ console.log(response); },
    //     error: (error) => console.log(error),
    //   });
    // }
}
