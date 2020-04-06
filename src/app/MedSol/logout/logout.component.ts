import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/app.component';
import { Router} from '@angular/router'
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _route:Router,
    private auth: AuthService
    ) {}

userId = localStorage.getItem("id");
  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  logOut(){
    this.auth.logout();
    this.dialogRef.close();
    this._route.navigate(['\login']);
    
  }
  hello(){
    console.log('logout clicked');
  }
  profile(){
    this.dialogRef.close();
    this._route.navigate(['/profile',this.userId]);
  }






}
