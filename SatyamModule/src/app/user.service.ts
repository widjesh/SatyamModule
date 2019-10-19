import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http : HttpClient) { }

  registerUser(obj:any){
    return this.http.post<any>('http://localhost:3000/users',obj);
  }
}
