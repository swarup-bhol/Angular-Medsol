import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditProfileComponent } from './edit-profile.component';

@Component({
  selector: 'app-edit-profile-photo',
  templateUrl: './edit-profile-photo.component.html',
  styleUrls: ['./edit-profile-photo.component.css']
})
export class EditProfilePhotoComponent implements OnInit {
  fileData: File;
  imageURL:string;
  constructor(private _dialogRef:MatDialogRef<EditProfilePhotoComponent>) { }

  ngOnInit() {
  }

  cancleDiv(){
    this._dialogRef.close();
  }

  onFileChanged(event){
    const reader = new FileReader();
    this.fileData = <File>event.target.files[0];
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
  }
}
