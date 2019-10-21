import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  // https://xecdapi.xe.com/v1/convert_to.json/?to=USD&from=SRD&amount=1
  constructor(public http:HttpClient) { }

  getUSDtoSRD(){
    this.http.get<any>('https://xecdapi.xe.com/v1/convert_to.json/?to=USD&from=SRD&amount=1');
  }

  getUSDtoEUR(){
    this.http.get<any>('https://xecdapi.xe.com/v1/convert_to.json/?to=USD&from=SRD&amount=1');
  }

  getEURtoSRD(){
    
  }
}
