import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Customer {
  id: number;
  name: string;
  surname: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }


  getCustomers() {
    return this.http.get<Customer[]>('http://angular.top6.at/api/customers/');

    /*return of([{
      id: 16,
      name: 'Top'
    }] as Customer[]).pipe(
      delay(1500)
    )*/
  }
}
