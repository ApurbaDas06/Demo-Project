import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SensorData} from 'src/app/models/sensorData.model';
import {ApiServicesService} from 'src/app/services/api-services.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from '@angular/router';

@Component({
  templateUrl: './sensor-main.component.html',
  styleUrls: ['./sensor-main.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SensorMainComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  chartData: Array<any>;


  ELEMENT_DATA: PeriodicElement[] = [{
    id: 0,
    timeEntry: " ",
    flowRate: 0,
    pressure: 0
  }];

  ELEMENT_DATA_Flow: flowData[] = [{
    timeEntry: " ",
    flowRate: 0
  }];

  ELEMENT_DATA_Pressure: pressureData[] = [{
    timeEntry: " ",
    pressure: 0
  }];
  displayedColumns: string[] = [ 'timeEntry', 'flowRate', 'pressure'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  sensors?: SensorData[];
  currentSensor: SensorData = {};
  currentIndex = -1;

  constructor(private apiService: ApiServicesService, private spinner: NgxSpinnerService,
              private router: Router ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    this.spinner.show();
    this.apiService.getAll()
      .subscribe({
        next: (data) => {
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);
          this.sensors = data;
          this.dataSource = new MatTableDataSource<PeriodicElement>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.ELEMENT_DATA = data;
          this.ELEMENT_DATA_Flow = data;
          this.ELEMENT_DATA_Pressure = data;
          },
        error: (e) => console.error(e)
      });
  }

  plotGraph(): void {
    this.generateData(this.ELEMENT_DATA_Flow, this.ELEMENT_DATA_Pressure)
  }

  generateData(flow: any, pressure: any) {
    this.chartData = [];
    this.chartData = this.ELEMENT_DATA;
  }

  refreshList(): void {
    this.getAllData();
    this.currentSensor = {};
    this.currentIndex = -1;
  }

   removeAllData(): void {
    this.apiService.deleteAll()
      .subscribe({
        next: (res) => {
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  redirectAdd(): void {
    this.router.navigate(['/add'])
  }

  returnDate(dateInput: Date): String {
    var s = new Date(dateInput).toLocaleString("en-US")
    return s;
  }
}

export interface PeriodicElement {
  id?: any;
  timeEntry?: string;
  flowRate?: number;
  pressure?: number;
}


export interface flowData {
  timeEntry?: string;
  flowRate?: number;
}


export interface pressureData {
  timeEntry?: string;
  pressure?: number;
}


