import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(public http: HttpClient, ) { }

  getCustomers() {

    return this.http.get<any>(`http://172.19.142.76:3000/customers`);
  }

  deleteCustomer(email: string) {
    return this.http.delete<any>(`http://172.19.142.76:3000/customers/remove/${email}`)
  }



}
