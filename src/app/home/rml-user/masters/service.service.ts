import { Injectable } from '@angular/core';
import{FormGroup,FormControl,FormBuilder} from '@angular/forms'
import {User} from "./user/user";
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private upersons!: User[]

  constructor() { }

  getUsersFromData(): User[] {
    return this.upersons;

  }

  addUser(user: User) {
    user.company_code = this.upersons.length + 1;
    console.warn(this.upersons.push(user));

  }
  updateUser(user: User) {
    const index = this.upersons.findIndex(u => user.company_code === u.company_code);
    this.upersons[index] = user;
  }
  deleteUser(user: User) {
    this.upersons.splice(this.upersons.indexOf(user), 1);
  }

}
