import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HeaderService } from '../../Services/header.service';
import { element } from 'protractor';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})



export class EditProfileComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _hs: HeaderService
    ) { }
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this._hs.header.next(true);
    this.editForm = new FormGroup({
      fullName:new FormControl(),
      email:new FormControl()
    })
  }

  onSideTabChange(selectedTab:string){
    var tabPane = document.querySelectorAll(".side-tab-pane");
    tabPane.forEach(function (element) {
      if(element.classList.contains("active"))
      {
        element.classList.remove("active");
      }
    })

    var tabPane = document.querySelectorAll(".side-tab");
    tabPane.forEach(function (element) {
      if(element.classList.contains("active"))
      {
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

}
