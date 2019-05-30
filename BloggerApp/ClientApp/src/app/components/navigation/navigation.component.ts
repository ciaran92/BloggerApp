import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  loggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  logout() {
    console.log("logout called");
    this.authService.logout().subscribe(
      res => 
      {
        this.authService.removeCookies();
        this.route.navigate(['/home']);
      }
    )
  }

}
