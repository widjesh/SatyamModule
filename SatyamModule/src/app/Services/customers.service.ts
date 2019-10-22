import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  selectedCustomer: any;

  constructor(public http: HttpClient, ) { }

  getCustomers() {
    return this.http.get<any>(`http://172.19.142.76:3000/customers`);
  }

  deleteCustomer(email: string) {
    return this.http.delete<any>(`http://172.19.142.76:3000/customers/remove/${email}`)
  }

  addBooking(booking: any, email: string) {
    return this.http.patch<any>(`http://localhost:3000/customers/addbooking/${email}/`, booking);
  }

  getCustomerByEmail(email) {
    return this.http.get<any>(`http://localhost:3000/customers/${email}/`);
  }

  setSelectedCustomer(email: any) {
    this.selectedCustomer = email;
  }

  getSelectedcustomer() {
    console.log(this.selectedCustomer);
    return this.selectedCustomer;

  }

}
