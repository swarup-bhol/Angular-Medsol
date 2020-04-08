import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { HeaderService } from '../../Services/header.service';
import { APIsService } from 'src/app/Services/apis.service';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewChecked {
  currentUser = localStorage.getItem('id');
  private profileUrl = "http://localhost:8080/api/medsol/profile/";
  profileData;
  PostList;
  following;
  userId: string;
  fileData: File;
  constructor(
    private _hs: HeaderService,
    private _as: APIsService,
    private _route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private _ts: ToastrService,
    private _router: Router

  ) { }
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.userId = this._route.snapshot.paramMap.get("id");
    this.getProfileDetails();
    this._hs.header.next(true);
    if(this.userId != this.currentUser){
      this.isFollowing(this.userId,this.currentUser);
    }
    this.getUploadedPosts();

  }
  isFollowing(userId: string, currentUser: string) {
     const url = "http://localhost:8080/api/user/"+currentUser+"/isFollow/"+userId;
     this._as.getRequest(url).subscribe(
       data =>{
        if(data.status == 200){
          this.following = data.result;
        }
       },error=>{
         if(error.status == 401){
           this._ts.error('Token expire , please login to proceed')
         }
       }
     );
  }

  // Change profile picturte
  onFileChanged(event) {
    const uploadUrl = 'http://localhost:8080/api/medsol/profile/upload/profilePic/';
    this.fileData = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('file', this.fileData);
    this._hs.loader.next(true)
    this._as.postRequest(uploadUrl + this.userId, formData).subscribe(
      data => {
        if (data.status == 200) {
          this._ts.success('ProfilePicture uploaded Successully');
          this._hs.loader.next(false)

          location.reload()
        }
      },
      error => {
        this._hs.loader.next(false);
        if(error.status == 401){
          this._ts.error('token expire please login to proceed');
          this._router.navigate(['/login']);
        }
        console.log(error);
      }
    );
  }

  // Get the profile details
  getProfileDetails() {
    this._as.getRequest(this.profileUrl + this.userId).subscribe(
      data => {
        if (data.status == 200) {
          this.profileData = data.result;
        }
      }, error => {
        if(error.status == 401 || error.status == 400){
          this._ts.error('token expire please login to proceed');
          this._router.navigate(['/login']);
        }
        console.log(error)
      }
    );
  }
  // Follow the user
  followUser() {
    const url = "http://localhost:8080/api/user/"+this.currentUser+"/follow/"+this.userId;
     this._as.postRequest(url,"").subscribe(
       data =>{
        if(data.status == 200){
          this.following = data.result.following;
          location.reload();
        }
       },error=>{
         if(error.status == 401){
           this._ts.error('Token expire , please login to proceed')
         }
       }
     );
  }
  // unfollow User
  unFollowUser() {

  }

  getUploadedPosts(){
    const url="http://localhost:8080/api/medsol/posts/"+this.userId;
    this._as.getRequest(url).subscribe(
      data=>{
        if(data.status == 200){
          this.PostList = data.result;
        }
      },
      error=>{
        if( error.status == 401){
          this._ts.error("Token Expire Login to procceed")
          localStorage.removeItem('token')
          this._router.navigate(['/login'])
        }
        else{
          this._ts.error("Some server error happen")
        }
        console.log(error);
      }
    )
  }
}
