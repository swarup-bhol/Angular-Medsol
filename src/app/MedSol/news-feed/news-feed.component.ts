import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { APIsService } from 'src/app/Services/apis.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from 'src/app/Services/profile.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  private followUser = "http://localhost:8080/api/user/peoples/";
  private profileUrl = ""
  userId= localStorage.getItem('id')
  peopleList:[];
  profileDetails: any;
  commentList: any[] = [{ "Comment": "Exelent", "Name": "Swaroop" },
  {"Comment": "Superb", "Name": "Ashish"}
  ];
  profile;
  @ViewChild('txtComment',{static:true}) txtComment: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private _as: APIsService,
    private _ts: ToastrService,
    private _router: Router,
    private _ps: ProfileService,
    private _dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getSuggetionPeopleList();
    this.getProfileDetails();
  }
  follow(followingUser){
    console.log(followingUser)
  }

  // Get suggested people list
  getSuggetionPeopleList(){
    this._as.getRequest(this.followUser + "0/6").subscribe(
      (response) => {
        if(response.status == 200) this.peopleList = response.result;
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

  //Get login user Profile details
  getProfileDetails(){
    this._ps.getProfileDetails().subscribe(
      data=>{
        if(data.status == 200){
          this.profileDetails = data.result;
          this.profile = data.result.profile;
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
  openModal(){
    const dialogRef = this._dialog.open(PostsComponent, {position: {
        top: '6%',
        left: '7%'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  clickComment(){
    this.txtComment.nativeElement.focus();
  }


}
