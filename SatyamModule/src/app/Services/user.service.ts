import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(public http: HttpClient) { }

  registerUser(obj: any) {
    return this.http.post<any>("http://localhost:3000/users", obj);
  }

  getUserByEmail(email: string) {
    return this.http.get<any>(`http://localhost:3000/users/${email}`);
  }

  loginUser(obj: any) {
    return this.http.post<any>("http://localhost:3000/users/login", obj);
  }

  getAllUsers() {
    return this.http.get<any>("http://localhost:3000/users");
  }

  deleteUser(email) {
    return this.http.delete<any>(`http://localhost:3000/users/remove/${email}`);
  }

  updateUserPassword(email: string, password: string) {
    return this.http.patch<any>(`http://localhost:3000/users/updaterole/${email}`, password);
  }


}
