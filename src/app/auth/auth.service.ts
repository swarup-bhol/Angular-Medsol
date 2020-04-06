import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isValid: boolean;
// Get the token.
  getToken() {
    return localStorage.getItem('token');
  }
  // Return the token existance.
  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  // Remove token from localstorage.
  logout() {
    localStorage.clear();
  }
}
