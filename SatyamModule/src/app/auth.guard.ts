import { Injectable } from '@angular/core';
import {Router, CanActivate } from '@angular/router';
import { CookieService } from './Services/cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{  
  constructor(private _cookieService : CookieService,
    private _router : Router){}

  canActivate():boolean{
    if(this._cookieService.loggedIn()){
      return true;
    }else{
      this._router.navigate(['/pages/auth/login']);
      return false;
    }
  }
}
