import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {ClearagApiService} from '../clearag-api.service';
import { apiCredentials } from '../../environments/config';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-growth-chart',
  templateUrl: './growth-chart.component.html',
  styleUrls: ['./growth-chart.component.css']
})
export class GrowthChartComponent implements OnInit {

  data;

  seriesA = {
    name: 'Daily Air Temp Range',
    type: 'arearange',
    data: [],
    yAxis: 0,
    tooltip: {
      valueSuffix: ' °F'
  }
  }
  seriesB = {
    name: 'AGDD',
    data: [],
    yAxis: 1,
  }

  public options: any = {
    chart: {
      zoomType: 'x',
      height: 700
    },
    title: {
      text: 'Corn Growth Data'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      crosshairs: true,
      shared: true,
  },
    xAxis: {
      type: 'datetime',

    },
    yAxis: [
      { // Primary yAxis
        labels: {
            format: '{value}°F',
        },
        title: {
            text: 'Temperature Range',
        }
      }, 
      { // Secondary yAxis
        title: {
            text: 'AGDD',
        },
        opposite: 1
      }],
    series: [this.seriesA, this.seriesB]
  }
 
  constructor(private ClearagApi: ClearagApiService) { }

  ngOnInit() {

    this.ClearagApi.fetchCornGrowth(apiCredentials.CA_Growth_UUID).subscribe((res : any)=>{

      if(!res.data) { return [] }

      this.data = this.ClearagApi.convertGrowthModel(res);

      this.data.data.map( d => {
        const date = new Date(d.date);

        this.seriesA.data.push([date.getTime(), d.air_temp_min , d.air_temp_max]);
        this.seriesB.data.push([date.getTime(), d.agdd])

      });

      Highcharts.chart('cornChart', this.options);


    });
  }

}
