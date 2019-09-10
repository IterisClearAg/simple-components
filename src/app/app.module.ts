import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ClearagApiService} from './clearag-api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from  '@angular/common/http';
import { ChartComponent } from './chart/chart.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ClearagApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
