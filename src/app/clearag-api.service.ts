import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { apiCredentials } from '../environments/config';



@Injectable({
  providedIn: 'root'
})
export class ClearagApiService {

  currentConditionUrl = 'https://ag.us.clearapis.com/v1.1/currentconditions';
  hourlyForecastUrl = 'https://ag.us.clearapis.com/v1.1/forecast/hourly';


  constructor( private  http:  HttpClient) { }

  public fetchHourlyForecast(location: string) {
    return this.http.get<any>(`${this.hourlyForecastUrl}/?app_id=${apiCredentials.CA_Account_appId}&app_key=${apiCredentials.CA_Account_appKey}&location=${location}&start=0&end=240`);
  }


  public fetchCurrentConditions(location: string): Observable<any> {
    console.log(location);
    return this.http.get<any>(`${this.currentConditionUrl}/?app_id=${apiCredentials.CA_Account_appId}&app_key=${apiCredentials.CA_Account_appKey}&location=${location}`);
  } 

  convertToWeatherModel(dataObj) {
    const locationKey = Object.keys(dataObj)[0];
    const dates = Object.keys(dataObj[locationKey]);

    const weatherData = [];
    dates.forEach(dt => {
      const item = Object.assign({}, dataObj[locationKey][dt], {date: dt});
      weatherData.push(item);
    });

    const newData = {
      id: dataObj.id,
      location: locationKey,
      data: weatherData
    };
    return newData;
  }
}