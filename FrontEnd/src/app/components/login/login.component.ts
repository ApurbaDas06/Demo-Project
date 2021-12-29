import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
// Import the Router and navigation events
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string = "";

  constructor(private form: FormBuilder, private router: Router, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2500);
    this.loginForm = this.form.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  submit() {
    // console.log(this.loginForm.value);
    if (!this.loginForm.valid) {
      this.error = "Enter the details";
    } else {
      if (this.loginForm.value.email === 'admin@example.com' && this.loginForm.value.password === 'password') {
        this.router.navigate(['/add'])
      } else {
        this.error = "enter valid credentials"
      }

    }
  }


}
