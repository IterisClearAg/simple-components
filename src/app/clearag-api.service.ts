import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { flatMap, map, filter } from 'rxjs/operators';
import { CurrentCondition } from './current-condition.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClearagApiService {

  CA_User_UUID = '0972fbbf-fce5-4a99-94ee-35623c302da9';
  CA_Account_appId = '28f7e06c';
  CA_Account_appKey = '8a1e47457dac6bdc2edf4dd74f5d3f05';
  CA_Account_UUID = '1c7d76af-a79f-442d-9e38-84f03731f15c';
  CA_Field_UUID = '35ab8b1-af21-4e98-8d10-d5a0ba0edff5';

  location = '47.8645,-97.1373';

  currentConditionUrl = 'https://ag.us.clearapis.com/v1.1/currentconditions';
  hourlyForecastUrl = 'https://ag.us.clearapis.com/v1.1/forecast/hourly';


  constructor( private  http:  HttpClient) { }

  public fetchHourlyForecast() {
    return this.http.get<any>(`${this.hourlyForecastUrl}/?app_id=${this.CA_Account_appId}&app_key=${this.CA_Account_appKey}&location=${this.location}&start=0&end=240`);
  }


  public fetchCurrentConditions(): Observable<any> {
    return this.http.get<any>(`${this.currentConditionUrl}/?app_id=${this.CA_Account_appId}&app_key=${this.CA_Account_appKey}&location=${this.location}`);
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