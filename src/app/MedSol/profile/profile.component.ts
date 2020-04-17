import { Component, OnInit, AfterViewChecked, ChangeDetectorRef,Renderer2, ElementRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { HeaderService } from '../../Services/header.service';
import { APIsService } from 'src/app/Services/apis.service';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
import { ToastrService } from 'ngx-toastr';
import { Endpoint } from 'src/app/ApiEndpoints/Endpoint';
import { ExtendedEndpoint } from 'src/app/ApiEndpoints/ExtendedEndPoint';
import { promise } from 'protractor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewChecked {
  currentUser = '6';//localStorage.getItem('id');
  @ViewChild('xyz',{static:true}) xyz:ElementRef;
  @ViewChild('editDiv',{static:true}) editDiv: ElementRef;

  profileData;
  isEditComment:boolean=false;
  PostList;
  isEditPost:boolean=false;
  postId:number=0;
  following;
  userId;
  fileData: File;
  commentId:string;
  commentList=[{"commentId":"1","userName":"Swaroop","commentText":"Nice picture" },
  {"commentId":"2","userName":"Ashish","commentText":"Nice picture" }]; 
  constructor(
    private _hs: HeaderService,
    private _as: APIsService,
    private _route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private _ts: ToastrService,
    private _router: Router,
    private renderer: Renderer2

  ) {
    this.outsideClick()
    
   }
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  

  ngOnInit(): void {
    this.userId = '6';//this._route.snapshot.paramMap.get("id");
    this.getProfileDetails();
    console.log(this.profileData);
    this._hs.header.next(true);
    if(this.userId != this.currentUser){
      this.isFollowing(this.userId,this.currentUser);
    }
    this.getUploadedPosts();
    

  }

  outsideClick(){
    this.renderer.listen('window', 'click', (e: Event) => {
      var menu = document.querySelectorAll(".edit-comment-inner li");
      for(var i=0;i<menu.length;i++){
        if(menu[i] == e.target){
          this.isEditComment = true;
          this.isEditPost =true;
          break;
        }
      }
      if(i>=menu.length){
        this.isEditComment =false;
        this.isEditPost =false;
      }

      console.log(e.target);
    });
  }
  
  isFollowing(userId: string, currentUser: string) {
     this._as.getRequest(Endpoint.API_ENDPOINT+"user/"+currentUser+"/isFollow/"+userId).subscribe(
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
    this.fileData = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('file', this.fileData);
    this._hs.loader.next(true)
    this._as.postRequest(Endpoint.API_ENDPOINT+'medsol/v1/upload/profilePic/' + this.currentUser, formData).subscribe(
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
    // this._as.getRequest(Endpoint.API_ENDPOINT+ExtendedEndpoint.PROFILE+ this.userId).subscribe(
    //   data => {
    //     if (data.status == 200) {
    //        console.log(data)
    //       this.profileData = data.result;
    //     }
    //   }, error => {
    //     if(error.status == 401 || error.status == 400){
    //       this._ts.error('token expire please login to proceed');
    //       this._router.navigate(['/login']);
    //     }
    //     console.log(error)
    //   }
    // );
    this.profileData =  {
      "specialization": "Medicine",
      "detailsSpecialization": "Clinical Pharmacology",
      "profession": "Medical Student",
      "postCount": 2,
      "followerCount": 5,
      "followingCount": 3,
      "user": {
        "userId": 9,
        "fullName": "Pinaki Prasad bhol",
        "useremail": "pinaki@gmail.com",
        "userMobile": "78733497652",
        "instituteName": "VSS Medical College , Burla",
        "profilePicPath": "E:\\java\\MedSol\\Uploads\\ProfilePic\\download.jfif",
        "userDocumentPath": null,
        "grade": "Clinical Student",
        "professionId": 21,
        "specializationId": 37,
        "detailsSpecializationId": 96,
        "recordStatus": true,
        "mobileVerrified": false,
        "emailVerrified": false
      }
    }
  }
  // Follow the user
  followUser() {
    const url = "http://localhost:8080/api/user/"+this.userId+"/follow/"+this.currentUser;
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
    // const url="http://localhost:8080/api/medsol/posts/"+this.userId;
    // this._as.getRequest(url).subscribe(
    //   data=>{
    //     if(data.status == 200){
    //       this.PostList = data.result;
    //     }
    //   },
    //   error=>{
    //     if( error.status == 401){
    //       this._ts.error("Token Expire Login to procceed")
    //       localStorage.removeItem('token')
    //       this._router.navigate(['/login'])
    //     }
    //     else{
    //       this._ts.error("Some server error happen")
    //     }
    //     console.log(error);
    //   }
    // )
    this.PostList = [{"postId":21,"postContent":"Hello Everyone","postImgPath":"E:\\java\\MedSol\\Uploads\\Posts\\indian-woman-surgeon-260nw-561629101.webp","postVideoPath":null,"postUploadTime":"2020-04-14T16:32:06.000+0000","postUpdatedTime":"2020-04-14T16:32:06.000+0000","recordStatus":false},{"postId":22,"postContent":"Hii Goodmorning all","postImgPath":"E:\\java\\MedSol\\Uploads\\Posts\\image.jpg","postVideoPath":null,"postUploadTime":"2020-04-15T03:20:08.000+0000","postUpdatedTime":"2020-04-15T03:20:08.000+0000","recordStatus":false}]
   
  }

  async editComment(event:string){
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.outsideClick), 1000)
    });
    await promise;
    if(!this.isEditComment){
      this.isEditComment = true;
      this.commentId = event;
    }
    else{
      this.isEditComment = false;
      this.commentId = '0';
    }
   
  }

  onEditComment(value:string){

  }

  divCloseEvent(){
   

  }

 async editPost(value:number){

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.outsideClick), 1000)
    });
    await promise;

    this.isEditPost =true;
    this.postId = value;

  }
}
