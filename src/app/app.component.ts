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
  isSerched:boolean;
  searchInput:string='';
  SearchItem:any[]=[
    {
        "userId": 188,
        "name": "Swarup Bhol",
        "profileId": 189,
        "institute": "Vss Medical College",
        "grade": "Professor"
    },
    {
        "userId": 6,
        "name": "Manoswin Patro",
        "profileId": 190,
        "institute": "Vss college",
        "grade": "Hospital Dental Surgeons"
    },
    {
        "userId": 191,
        "name": "Abinash Tiwary",
        "profileId": 192,
        "institute": "SCB medical College",
        "grade": "Consultant"
    },
    {
        "userId": 193,
        "name": "Naveen Patnayak",
        "profileId": 194,
        "institute": "SCB medical College",
        "grade": "Hospital Dental Surgeons"
    },
    {
        "userId": 195,
        "name": "Nityanand Kanungo",
        "profileId": 196,
        "institute": "VSS Medical COllege",
        "grade": "Dental Student"
    },
    {
        "userId": 197,
        "name": "Ridhi Agarwal",
        "profileId": 198,
        "institute": "VSS Medical College",
        "grade": "Ophthalmology"
    }
];
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

  onKeyUp(event:any){
    console.log(event.target.value);
    if(this.searchInput =='')
    {
      this.isSerched = false;
    }
    else{
      this.isSerched = true;
    }
    
  }

  onCanleSearchClick(event:any){
    this.isSerched = false;
    this.searchInput ='';
  }
}
