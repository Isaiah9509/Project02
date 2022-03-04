import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/IUser';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  

  //create the user event
  //@Output() sendUser = new EventEmitter();
  
  //declaring the variables
  first: string = "";
  last: string = "";
  email: string = "";
  password: string = "";
  //error: boolean = false;

  onSubmit(): void {

    
    const user = {
      first: this.first,
      last: this.last,
      email: this.email,
      password: this.password
    } 

    //console.log(user);

    //connecting to userservice 
    this.userService.register(user)
    .subscribe(data => {
      if(data != null){
        alert("Successful account creation, please login");
        this.router.navigate(["/login"]);
      }
    })
    
  }

  
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

}