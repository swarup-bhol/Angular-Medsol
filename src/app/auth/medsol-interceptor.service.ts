import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedsolInterceptorService {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
     
      request = request.clone({
        setHeaders: {
          Authorization:`Bearer ${this.authService.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
