import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error: string;

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {
  }

  registerUser(form: NgForm) {
    let userDetails = JSON.stringify(form.value);
    console.log(userDetails);
    this.userService.register(userDetails).subscribe(result => {
      if(result){
          this.route.navigate(['/login']);
      }
  },
  error => {
      this.error = error
      console.log(this.error);
  });
  }

}
