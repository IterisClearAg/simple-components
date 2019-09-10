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
  cornGrowthUrl = 'https://ag.us.clearapis.com/v1.1/crop_health/corn/growth';


  constructor( private  http:  HttpClient) { }

  public fetchHourlyForecast(location: string) {
    return this.http.get<any>(`${this.hourlyForecastUrl}/?app_id=${apiCredentials.CA_Account_appId}&app_key=${apiCredentials.CA_Account_appKey}&location=${location}&start=0&end=240`);
  }


  public fetchCurrentConditions(location: string): Observable<any> {
    return this.http.get<any>(`${this.currentConditionUrl}/?app_id=${apiCredentials.CA_Account_appId}&app_key=${apiCredentials.CA_Account_appKey}&location=${location}`);
  } 

  public fetchCornGrowth(growth: string): Observable<any> {
    return this.http.get<any>(`${this.cornGrowthUrl}/?app_id=${apiCredentials.CA_Account_appId}&app_key=${apiCredentials.CA_Account_appKey}&growth_id=${growth}&days=365&account_id=${apiCredentials.CA_Account_UUID}&user_id=${apiCredentials.CA_User_UUID}`);
  } 

  convertGrowthModel(dataObj) {
    const dataKey = Object.keys(dataObj)[0];
    const growthDataKeys = Object.keys(dataObj[dataKey])[0];
    const locationKey = Object.keys(dataObj.data)[0];
    const growthKey = Object.keys(dataObj[dataKey][growthDataKeys])[1];

    const dates = Object.keys(dataObj[dataKey][locationKey][growthKey]);    
    const weatherData = [];
    dates.forEach(dt => {
      const item = Object.assign({}, dataObj[dataKey][locationKey][growthKey][dt], {date: dt});
      weatherData.push(item);
    });

    const newData = {
      id: dataObj.id,
      location: locationKey,
      data: weatherData
    };

    return newData;
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