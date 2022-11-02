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
    return this.http.post(' http://localhost:3000/logins', { User_Name, Password });
  }

//   14.99.10.243 
//   getProducts(): Observable<ProductModel[]> {
//     return this.http.get<ProductModel[]>('products', {
//       headers: {},
//     });
//   }
}