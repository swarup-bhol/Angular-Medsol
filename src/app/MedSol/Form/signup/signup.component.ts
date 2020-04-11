import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { APIsService } from 'src/app/Services/apis.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/Services/header.service';
import {Url} from "src/app/Utils/Utils"
import { from } from 'rxjs';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isSubmitted = false;


  // Instantiate Object
  constructor(
    private _fb: FormBuilder,
    private _apiService: APIsService,
    private _ts: ToastrService,
    private _router: Router,
    private _hs: HeaderService,
  ) { }

  // Instantiating form
  ngOnInit() {
    this.signupForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

 
   // Creating User 
  createUser(){
    this.isSubmitted = true;
    console.log("xyz");
    if(!this.signupForm.valid) return;
    this._hs.loader.next(true);
    console.log(this.signupForm.value);
    this._apiService.postRequest(Url.userRegister, this.signupForm.value).subscribe(
      success=>{ // Success
        if(success.status == 200){
          this._hs.loader.next(false);
          this._router.navigate(['/login/info', success.result.email]);
        }else if(success.status == 409) {
          this._hs.loader.next(false);
          this._ts.error("User Already exist");
        }
        else {
          this._hs.loader.next(false);
          this._ts.error("Some error occured");
        }
      },
      error=>{ //Error
        this._hs.loader.next(false);
        this._ts.error("Some error occured");
        console.log(error)
      }
    );
  }
  //Form returning form controls
  get f() { return this.signupForm.controls; }
}
