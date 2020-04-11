import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIsService } from 'src/app/Services/apis.service';
import { HeaderService } from 'src/app/Services/header.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Endpoint } from './../../../ApiEndpoints/Endpoint';
import { Constant } from './../../../ApiEndpoints/Constants';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  // Declared Variable
  gradeSelect: boolean;
  checkProf = true;
  professions: [];
  gradeList: [];
  specializations: [];
  subSpecList: [];
  infoForm: FormGroup;
  isSubmitted = false;
  email: string;


  // Instantiating objects
  constructor(
    private fb: FormBuilder,
    private _apiService: APIsService,
    private _hs: HeaderService,
    private _ts: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  // Init Method to crearte form instances
  // Get the parameter value 
  ngOnInit() {
    this._hs.loader.next(true);
    this.email = this.route.snapshot.paramMap.get("username");
    this.gradeSelect = true;
    this._hs.header.next(false);

    // Form instances
    this.infoForm = this.fb.group({
      profession: ['', Validators.required],
      grade: ['', Validators.required],
      institute: ['', Validators.required],
      specialty: ['', Validators.required],
      subspecialties: ['', Validators.required],
    });
    this.getAllProfession();
    this.getAllSpecialization();
  }


  // Getting All profession
  getAllProfession() {
    this._apiService.getRequest(Endpoint.API_ENDPOINT + 'medsol/profession/all').subscribe(
      data => {
        if (data.status == 200) {
          this.professions = data.result;
          this._hs.loader.next(false);
        } else {
          this._hs.loader.next(false);
        }
      },
      error => {
        this._ts.error("Some error occured");
        this._hs.loader.next(false);
        console.log(error);
      }

    );
  }
  //Get Specialization
  onProfSelect(id) {
    if (id != '20' || id != '22' || id != '23') {
      this.gradeSelect = false;
      this._apiService.getRequest(Endpoint.API_ENDPOINT + 'medsol/profession/spec/' + id).subscribe(
        data => {
          if (data.status = 200) this.gradeList = data.result;
        }
      );
    }
    if (id == 21) this.checkProf = false;
    else this.checkProf = true;
  }

  //Get all Specializations 
  getAllSpecialization() {
    this._apiService.getRequest(Endpoint.API_ENDPOINT + 'medsol/profession/spec/20').subscribe(
      data => {
        if (data.status = 200) this.specializations = data.result;
      }
    );
  }
  // Getting the subspecialization list
  onSpecSelected(id) {
    this._apiService.getRequest(Endpoint.API_ENDPOINT + 'medsol/profession/subSpec/' + id).subscribe(
      data => {
        if (data.status = 200) this.subSpecList = data.result;
      }
    );
  }


  // Submitting the form
  onSubmit() {
    // console.log(this.infoForm.value);
    // return;
    this.isSubmitted = true;
    if (!this.infoForm.valid) return;
    this._hs.loader.next(true);
    const infoUrl = Endpoint.API_ENDPOINT + 'medsol/v1/profile/create/' + this.email;
    this._apiService.postRequest(infoUrl, this.infoForm.value).subscribe(
      success => {
        if (success.status == 200) {
          localStorage.setItem('token', success.result.token);
          localStorage.setItem('id', success.result.userId);
          this._hs.loader.next(false);
          this.router.navigate(['/feeds']);
        } else if (success.status == 409) {
          this._ts.error("Profile Already exist for the user");
          this._hs.loader.next(false);
        }
      },
      err => {
        if (err.error.status == 404) {
          this._ts.error(err.error.message);
        } else if (err.error.status == 500) {
          this._ts.error(Constant.SERVER_ERROR);
        } else {
          console.log(err);
        }
        this._hs.loader.next(false);
      }
    );
  }


  //return form controls
  get f() { return this.infoForm.controls; }
}
