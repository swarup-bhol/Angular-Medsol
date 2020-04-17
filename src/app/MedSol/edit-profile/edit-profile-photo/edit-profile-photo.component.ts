import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-edit-profile-photo',
  templateUrl: './edit-profile-photo.component.html',
  styleUrls: ['./edit-profile-photo.component.css']
})
export class EditProfilePhotoComponent implements OnInit {

  constructor(private _dialogRef:MatDialogRef<EditProfilePhotoComponent>) { }

  ngOnInit() {
  }

  cancleDiv(){
    this._dialogRef.close();
  }
}
