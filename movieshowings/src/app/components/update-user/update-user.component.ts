import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  
  @Output() changePage = new EventEmitter();

  hide:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  showFirst:string = "";
  showLast:string = "";
  showEmail:string = "";
  showPassword:string = "";
  
  showHide(): void {
    this.hide = !this.hide;

  }

  updateUser(): void {
    const user:IUser = {
      first: this.showFirst,
      last: this.showLast,
      email: this.showEmail,
      password: this.showPassword
    }

    this.changePage.emit(user);

    this.showFirst = "";
    this.showLast = "";
    this.showEmail = "";
    this.showPassword = "";
  }



}
