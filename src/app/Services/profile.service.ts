import { Injectable } from '@angular/core';
import { APIsService } from './apis.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private  url = 'http://localhost:8080/api/medsol/profile/';
  userId = localStorage.getItem('id');
  constructor(
    private _apiService: APIsService
  ) { }

  getProfileDetails(){
    return this._apiService.getRequest(this.url+ this.userId);
  }
}
