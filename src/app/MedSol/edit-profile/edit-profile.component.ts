import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HeaderService } from '../../Services/header.service';

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
  editForm: any;

  constructor(
    private _fb: FormBuilder,
    private _hs: HeaderService
    ) { }
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this._hs.header.next(true);
    this.editForm = this._fb.group({
      name:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile:['',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]]

    });
  }

}
