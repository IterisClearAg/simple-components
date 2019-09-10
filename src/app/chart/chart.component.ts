import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {ClearagApiService} from '../clearag-api.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  data; 

  location: '47.8645,-97.1373';

  seriesA = {
    name: 'Temperature',
    data: []
  }
  seriesB = {
    name: 'Relative Humidity',
    data: []
  }

  public options: any = {
    chart: {
      zoomType: 'x',
      height: 700
    },
    title: {
      text: 'Hourly Forecast (Temperature & Relative Humidity)'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      shared: true
    },
    xAxis: {
      type: 'datetime',

    },
    series: [this.seriesA, this.seriesB]
  }
  constructor(private ClearagApi: ClearagApiService) { }

  ngOnInit(){

    this.ClearagApi.fetchHourlyForecast(this.location).subscribe((res : any)=>{
      const response = Object.assign({}, res);
      const keys = Object.keys(response);
      let x = response[keys[0]];
      this.data = this.ClearagApi.convertToWeatherModel(res);

      this.data.data.map( d => {
        this.seriesA.data.push([d.date * 1000, d.air_temp.value]);
        this.seriesB.data.push([d.date * 1000, d.relative_humidity.value])

      });

      Highcharts.chart('container', this.options);


    });

    
  }
}