import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

 constructor(public http : HttpClient) { }

 getWeather(){
    return this.http.get<any>('Ahttp://api.openweathermap.org/data/2.5/forecast?q=Paramaribo&APPID=0cfc3de3430df75b55c3b9d594c42401&units=metric');
  }

}
