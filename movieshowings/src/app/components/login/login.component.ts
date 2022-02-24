import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String = "";
  password: String = "";
  error: boolean = false;

  onSubmit(): void {
    console.log(this.email);
    console.log(this.password);

    //connect to userService
    this.userService.login(this.email, this.password)
    .subscribe(data => {
      let email2 = "";
      let password2 = "";
      if(data.email) {
        email2 = data.email;
      }
      if(data.password) {
        password2 = data.password;
      }
      this.userService.user = {
        email: email2,
        password: password2
      };
    });

  }

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

}