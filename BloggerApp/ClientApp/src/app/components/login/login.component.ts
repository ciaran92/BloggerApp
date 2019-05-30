import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string = "";
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    console.log("called");
    let loginCredentials = JSON.stringify(form.value);
    this.authService.login(loginCredentials).subscribe(result => {
      if(result) {
          this.route.navigate(['/create-post']);
      }
    },
    error => {
        this.error = error
        if(error.status == 400) {
          this.error = error.error;
          console.log(error.statusText);
        } else {
          console.log("error occurred: " + error.statusText + ": " + error.status);
        }
    });
  }

}
