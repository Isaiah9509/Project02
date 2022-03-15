import { Time } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { PurchaseService } from 'src/app/services/purchase-service.service';
import { ITicket } from 'src/app/interfaces/ITicket';

import { Router, NavigationExtras } from '@angular/router';
import { IPurchase } from '../../interfaces/IPurchase';
import { SetAndGetTicketsService } from '../../services/set-and-get-tickets.service';
import { TicketServiceService } from 'src/app/services/ticket-service.service';


@Component({
  selector: 'purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  selectAllTicketsState: boolean = false;

  hide: boolean = true;

  showHide(): void {
    this.hide = !this.hide;
  }


  constructor(private purchaseService: PurchaseService, private router: Router, private get: SetAndGetTicketsService, private ticketService:TicketServiceService) { }

  ngOnInit(): void {
    this.getTheSelectedTickets();
    console.log(this.getTheSelectedTickets());
  }

  ticket: ITicket = {
    id: 0,
    price: 0,
    movieTitle: "",
    genre: "",
    showTime: "",
    showTimeSlot: "",
    owner: {
      id: "",
      email: "",
      password: ""
    },
  }

  ticketsForPurchase: ITicket[] = [];

  purchase: IPurchase = {
    id: 0,
    price: 0,
    tickets: [],
    owner: {
      id: "",
      email: "",
      password: ""
    },
  }

  purchaseTotalAmt: number = 0;

 

  getTheSelectedTickets() {
    this.ticketsForPurchase = this.get.getSelectedTickets();
    console.log(this.ticketsForPurchase);

    //add up the total to display on the page
    this.addTotal();
    console.log("Total: $" + this.purchaseTotalAmt);
  }

  addTotal() {
    var num: number = 0;
    var sum: number = 0;
    while (num < this.ticketsForPurchase.length) {
      sum += this.ticketsForPurchase[num].price;
      num++
    }
    num = parseInt((Math.round(num * 100) / 100).toFixed(2));
    this.purchaseTotalAmt =  this.purchase.price = sum;
  }

  getCookie(cname: any) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  sendPurchase() {
    this.purchase.tickets = this.ticketsForPurchase;
    //set owner info
    this.purchase.owner.id = this.getCookie("id");
    this.purchase.owner.email = this.getCookie("email");
    this.purchase.owner.password = this.getCookie("password");


    console.log("called sendPurchase");
    console.log(this.purchase.tickets);

    this.purchaseService.sendPurchase(this.purchase, this.purchase.owner.id)
      .subscribe((data) => {
        console.log(data);

        if(data.id){
        let id = data.id;
        let purchaseID = id.toString();
        let ownerID = this.getCookie("id");

          for(var i = 0; i < data.tickets.length; i++){
            this.ticketService.updateTickets(data.tickets[i], purchaseID, ownerID)
              .subscribe((data) => {
              console.log(data);
            })
          }
        
       }

   })
      
   alert("Thank you for your purchase. Enjoy your movie!")
   
  }

}

