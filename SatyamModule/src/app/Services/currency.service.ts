import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CurrencyService {
  // https://xecdapi.xe.com/v1/convert_to.json/?to=USD&from=SRD&amount=1
  constructor(public http: HttpClient) { }

  getEURtoUSD() {
    return this.http.get<any>(
      "Ahttps://xecdapi.xe.com/v1/convert_to.json/?to=EUR&from=USD&amount=1"
    );
  }


  getEURtoSRD() {
    return this.http.get<any>(
      "Ahttps://xecdapi.xe.com/v1/convert_to.json/?to=EUR&from=SRD&amount=1"
    );
  }

  getUSDtoSRD() {
    return this.http.get<any>(
      "Ahttps://xecdapi.xe.com/v1/convert_to.json/?to=USD&from=SRD&amount=1"
    );
  }


}
