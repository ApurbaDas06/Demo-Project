import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {NgModule} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule} from "ngx-spinner";
import {AngularMaterialModule} from './angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AddSensorComponent} from './components/add-sensor-data/add-sensor.component';
import {SensorMainComponent} from './components/sensor-main/sensor-main.component';
import {MultiSeriesComponent} from './components/sensor-main/multi_series_line_chart/multi-series.component';
import {LoginComponent} from "./components/login/login.component";


@NgModule({
  declarations: [
    AppComponent,
    AddSensorComponent,
    SensorMainComponent,
    MultiSeriesComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatPaginatorModule,
    NgbModule,
    NgxSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule {
}
