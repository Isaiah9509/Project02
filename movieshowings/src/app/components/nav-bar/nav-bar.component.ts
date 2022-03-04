import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  showLogin: boolean = true;

  constructor(private router: Router, private us: UserService) { }

  ngOnInit(): void {
    this.us.user$.subscribe(user => {
      if (user.id != undefined && user.id != null) {
        this.showLogin = false;
      } else {
        this.showLogin = true;
      }
    })
  }

  navigateLogin():void{
    this.router.navigate(['login']);
  }
  navigateHome():void{
    this.router.navigate(['main-page']);
  }
  navigateAccount():void{
    this.router.navigate(['user-page']);
  }
  navigateTickets():void{
    this.router.navigate(['saved-tickets']);
  }
  navigatePurchase():void{
    this.router.navigate(['purchase']);
  }
  navigateLogout():void{
    this.us.logout().subscribe(()=> {
      this.router.navigate(['login']);

      // We probably should only use the user$ observable to get the user data to detect when user logs in/out, ticket object is using this us.user
      this.us.user = {
        email: "",
        password: "",
      }
      //navbar using this to see change
      this.us.user$.next({
       email:"", password:""
      });
      
    });
  }

}