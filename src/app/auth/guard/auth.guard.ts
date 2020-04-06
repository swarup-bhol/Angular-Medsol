import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router, private authService: AuthService) { }
// Activate Route
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.route.navigate(['/login']);
    return false;
  }
  
}
