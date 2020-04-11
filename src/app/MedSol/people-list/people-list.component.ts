import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Endpoint } from 'src/app/ApiEndpoints/Endpoint';
import { APIsService } from 'src/app/Services/apis.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  /**
   * 
   */
  userId= localStorage.getItem('id');
  /**
   * 
   */
  peopleList:[];
  /**
   * 
   */
  id: string;
  /**
   * 
   */
  details: string;
  /**
   * 
   * @param _as 
   * @param _ts 
   * @param _router 
   * @param _route 
   */
  constructor(

    private _as: APIsService,
    private _ts: ToastrService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }
/**
 * 
 */
  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get("id");
    this.details = this._route.snapshot.paramMap.get("details");
    if(this.details == 'suggetions'){
      this.getSuggetionPeopleList();
    }else if(this.details == 'followers'){
      this.getAllFollowerList();
    }else{
     this.getAllFollowingList();
    }
  }

/**
 * 
 * @param followingUser 
 */
  follow(followingUser){
    console.log(followingUser)
  }

  unFollowUser(followingUser){

  }

  /**
   * 
   */
  getSuggetionPeopleList(){
    this._as.getRequest(Endpoint.API_ENDPOINT+'user/'+this.userId+'/peoples/0/6').subscribe(
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
  /**
   * 
   */
  getAllFollowerList(){

  }
  /**
   * 
   */
  getAllFollowingList(){

  }
}
