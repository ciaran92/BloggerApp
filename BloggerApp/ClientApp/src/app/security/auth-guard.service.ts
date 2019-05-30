import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  

  constructor(private authService: AuthService, private route: Router) { }

  canActivate() {
    console.log(this.authService.isUserLoggedIn());
    if(this.authService.isUserLoggedIn()) {
      return true;
    }
    this.route.navigate(['/home']);
    return false;
  }
}
