import { Injectable } from '@angular/core';
import { CanActivate
, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private route: Router, private authService: AuthService) { }
  // Activate Route
    canActivate(): boolean {
      if (this.authService.isAuthenticated()) {
        this.route.navigate(['/feeds']);
        return false;
      }
      return true;
    }
  
}
