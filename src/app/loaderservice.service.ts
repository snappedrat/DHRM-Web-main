import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoaderserviceService {
isLoding:BehaviorSubject<any>
  constructor() {
    this.isLoding = new BehaviorSubject(false);
   }

   show(){
    this.isLoding.next(true)
    console.log('loading...')
   }

   hide(){
    this.isLoding.next(false)

    console.log('loading stopped')
   }
}
