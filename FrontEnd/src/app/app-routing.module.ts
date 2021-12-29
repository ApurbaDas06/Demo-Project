import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SensorMainComponent} from './components/sensor-main/sensor-main.component';
import {AddSensorComponent} from './components/add-sensor-data/add-sensor.component';
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'tableData', component: SensorMainComponent},
  {path: 'add', component: AddSensorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
