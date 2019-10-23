import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
var jwtDecode = require('jwt-decode');


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token : any;
  user : any;

  constructor(private _cookieService : CookieService) { 
    this.token = this._cookieService.getToken();
    this.user = jwtDecode(this.token);
    console.log('Test');
  }
}
