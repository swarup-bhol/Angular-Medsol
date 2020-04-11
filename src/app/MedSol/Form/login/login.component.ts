import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { APIsService } from 'src/app/Services/apis.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from 'src/app/Services/header.service';
import { Endpoint } from './../../../ApiEndpoints/Endpoint';
import { ExtendedEndpoint } from './../../../ApiEndpoints/ExtendedEndPoint';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  durationInSeconds = 5;
  constructor(
    private _apiservice: APIsService,
    private router: Router,
    private _ts: ToastrService,
    private _hs: HeaderService
  ) { }

  // Form controls
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  // Init Methods
  ngOnInit() {

  }
  // Submit the Form
  loginUser() {
    // this.isSubmited = true;
    if (!this.loginForm.valid) return;
    this._hs.loader.next(true);
    this._apiservice.postRequest(Endpoint.API_ENDPOINT+ExtendedEndpoint.LOGIN, this.loginForm.value).subscribe(
      data => {
        if (data.status == 200) { 
          localStorage.setItem('token', data.result.token); 
          localStorage.setItem('id', data.result.userId); 
          this._hs.loader.next(false); 
          this.router.navigate(['/feeds']) 
        }
        else if (data.status == 400) {
          this._hs.loader.next(false);
          this._ts.error("error", data.message);
        }
        else {
          this._hs.loader.next(false);
          this._ts.error("error", "some error occored");
        }
      },
      error => { console.log(error);  this._hs.loader.next(false);}
    );
  }

  // Custom Error Handling
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

}
