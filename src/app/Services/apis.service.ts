import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIsService {

    constructor(private _http: HttpClient) { }

  // Login/Signup API Request
  postRequest(url,payload):Observable<any>{
    return this._http.post(url,payload);
  }
  getRequest(url):Observable<any>{
    return this._http.get(url);
  }

}
