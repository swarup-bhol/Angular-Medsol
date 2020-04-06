import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { HeaderService } from './Services/header.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LogoutComponent } from './MedSol/logout/logout.component';
import { ProfileService } from './Services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewChecked {

  showHeader: boolean;
  userId = localStorage.getItem('id');
  loader: boolean;
  profileDetails: any;
  constructor( 
    private _hs: HeaderService,
    public dialog: MatDialog,
    private cdRef : ChangeDetectorRef,
    private _ps: ProfileService,
    private _ts: ToastrService,
    private _router:Router
    ){}
  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }
  value = 'Clear me';
  ngOnInit(): void {
    this._hs.header.subscribe((data)=>{this.showHeader= data;});
    this._hs.loader.subscribe((data)=>{this.loader= data;});
    this.getProfileDetails();
  }
  call(){console.log('btn click')}
  openDialog(): void {
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  //Get login user Profile details
  getProfileDetails(){
    this._ps.getProfileDetails().subscribe(
      data=>{
        if(data.status == 200){
          this.profileDetails = data.result;
        }
       
      },
      (err) => 
      {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            this._ts.error('Token Expire PLease login to Procceed');
            this._router.navigate(['/login']);
          }
        }
      });
  }


}
