import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HeaderService } from '../../Services/header.service';
import { element } from 'protractor';
import { MatDialog, } from '@angular/material';
import { EditProfilePhotoComponent } from './edit-profile-photo/edit-profile-photo.component';
import { Endpoint } from 'src/app/ApiEndpoints/Endpoint';
import { ExtendedEndpoint } from 'src/app/ApiEndpoints/ExtendedEndPoint';
import { APIsService } from 'src/app/Services/apis.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})



export class EditProfileComponent implements OnInit {
  isSubmitted = true;
  editForm: FormGroup;
  userId: string;
  profileData: any;
  constructor(
    private _fb: FormBuilder,
    private _hs: HeaderService,
    private _dialog: MatDialog,
    private _as: APIsService,
    private _ts:ToastrService,
    private _router: Router
  ) {
  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this._hs.header.next(true);
    this.editForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      profession: new FormControl('', Validators.required),
      MobileNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
      Institue: new FormControl('', Validators.required)
    });
    this.getProfileUserProfileDetails();
  }

  onSideTabChange(selectedTab: string) {
    var tabPane = document.querySelectorAll(".side-tab-pane");
    tabPane.forEach(function (element) {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
    })

    var tabPane = document.querySelectorAll(".side-tab");
    tabPane.forEach(function (element) {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
    })
    if (selectedTab == "profile-details") {
      var tabPane = document.querySelectorAll(".profileDetails");
      tabPane.forEach(function (element) {
        element.classList.add("active");
      })
    }
    else {
      var tabPane = document.querySelectorAll(".changePassword");
      tabPane.forEach(function (element) {
        element.classList.add("active");
      })
    }
  }

  onEditFomSubmit() {

  }

  changeProfileOpen() {
    const dialogRef = this._dialog.open(EditProfilePhotoComponent, {
      panelClass: 'app-full-bleed-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  get f() { return this.editForm.controls; }

  getProfileUserProfileDetails() {
    this._as.getRequest(Endpoint.API_ENDPOINT + 'medsol/v1/profile/' + this.userId).subscribe(
      data => {
        if (data.status == 200) {
          console.log(data)
          this.profileData = data.result;
          this.setFields(this.profileData);
        }
      }, error => {
        if (error.status == 401 || error.status == 400) {
          this._ts.error('token expire please login to proceed');
          this._router.navigate(['/login']);
        }
        console.log(error)
      }
    );
  }
  setFields(profileData){
    this.editForm.controls.fullName = profileData.user.fullName;
    console.log(profileData)
  }
}
