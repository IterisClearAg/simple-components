import { Component, OnInit } from '@angular/core';
import {ClearagApiService} from '../clearag-api.service';
import _ from 'lodash';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  conditions ; 

  constructor(private ClearagApi: ClearagApiService) { 

  }

  ngOnInit() {

    // No error handling =(
      
    this.ClearagApi.fetchCurrentConditions('47.8645,-97.1373').subscribe((res : any)=>{
      const response = Object.assign({}, res);
      const keys = Object.keys(response);
      let x = response[keys[0]].current_conditions;
      this.conditions = x;
    });
  }

}
