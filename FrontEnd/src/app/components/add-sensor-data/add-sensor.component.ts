import {Component, OnInit} from '@angular/core';
import {SensorData} from 'src/app/models/sensorData.model';
import {ApiServicesService} from 'src/app/services/api-services.service';
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.css']
})
export class AddSensorComponent implements OnInit {
  addForm: FormGroup;
  sensor: SensorData = {
    timeEntry: '',
    flowRate: 0,
    pressure: 0
  };
  submitted = false;
  error: string = "";

  constructor(private apiService: ApiServicesService, private spinner: NgxSpinnerService, private router: Router, private form: FormBuilder
  ) {
  }

  minMax(control: FormControl) {
    return parseInt(control.value) > 0 ? null : {
      minMax: true
    }
  }

  ngOnInit(): void {
    this.newData();
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this.addForm = this.form.group({
      flowRate: new FormControl('', [Validators.required, this.minMax]),
      pressure: new FormControl('', [Validators.required, this.minMax])
    });
  }

  //getter f to access form controls (form.controls) from the template
  get f(): { [key: string]: AbstractControl } {
    return this.addForm.controls;
  }

  saveSensor(): void {

    if (this.addForm.valid) {

      const data = {
        timeEntry: Date.now(),
        flowRate: this.addForm.value.flowRate,
        pressure: this.addForm.value.pressure
      };

      this.apiService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true
            this.router.navigate(['/tableData'])
          },
          error: (e) => console.error(e)
        });
    } else {
      this.error = "Input Fields are Invalid (sensor data > 0 only)"

    }
  }

  newData(): void {
    this.submitted = false;
    this.sensor = {
      timeEntry: '',
      flowRate: 0,
      pressure: 0
    };
  }

}
