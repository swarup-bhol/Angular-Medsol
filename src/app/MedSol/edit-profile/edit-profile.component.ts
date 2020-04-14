import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroupDirective,  Validators, FormBuilder, FormGroup,NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HeaderService } from '../../Services/header.service';
import { element } from 'protractor';
import { MatDialog ,} from '@angular/material';
import { EditProfilePhotoComponent } from './edit-profile-photo/edit-profile-photo.component';


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
  editForm:FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _hs: HeaderService,
    private _dialog:MatDialog
    ) {
      }
  ngOnInit(): void {
    this._hs.header.next(true);
    this.editForm = new FormGroup({
      fullName:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      profession:new FormControl('',Validators.required),
      MobileNo:new FormControl('',[Validators.required,Validators.minLength(10)]),
      Institue: new FormControl('',Validators.required)
    });
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

  onEditFomSubmit(){

  }

  changeProfileOpen() {
    const dialogRef = this._dialog.open(EditProfilePhotoComponent,{
      panelClass: 'app-full-bleed-dialog', 
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  get f() { return this.editForm.controls; }

}
