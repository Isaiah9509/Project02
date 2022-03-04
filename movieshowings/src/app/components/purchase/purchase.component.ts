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
//import { LocalStorageService } from 'src/app/services/local-storage-services.service'

@Component({
  selector: 'purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

 // @Output() purchase = new EventEmitter();

  selectAllTicketsState: boolean = false;

  hide: boolean = true;

  showHide(): void {
    this.hide = !this.hide;
  }

   // constructor() { }
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
   // this.purchaseService.doPurchase(this.purchase);

    
    alert("Thank you for your purchase. Enjoy your movie!")

    //this.router.navigate(["/main-page"]);

    //   const selectedTickets = this.tickets.filter(item => item.addToPurchase);
    //   const navigationExtras: NavigationExtras = {
    //     state: {
    //       selectedTickets
    //     }
    //   };
    //   this.router.navigate(["/user-page"], navigationExtras );
  }



  /* I guess I don't need this function anymore...
    onSubmit(): void {
        console.log(this.ticketInfo);

        //connect to purchaseService
        this.purchaseService.purchase(this.purchaseID, this.userID)
            .subscribe(data => {
                let movieName2 = "";
                let tPrice = 0;
                let tQuant = 0;
                let tDateandTime = "";
                let userID = 0;
                let purchaseID = 0;
                if (data.userID) {
                    userID = data.userID;
                }
                if (data.purchaseID) {
                purchaseID = data.purchaseID;
                }

                this.purchaseService.ticket = {
                    movieName: movieName2,
                    price: tPrice,
                    quantity: tQuant,
                    show_date_and_time: tDateandTime
                };
            });
    }
    */

  /* I guess I don't need this anymore either...
  sendPurchase2(): void {

    this.purchaseService.purchase(this.purchaseID, this.userID);


    const message = {
      from: "sender@MovieTheater.com",
      to: this.userEmail,
      subject: "Purchase Confirmation",
      text: "Thank you for your purchase! A purchase of " + this.purchaseTotalAmt + " was made on " +
        this.purchasedDate + ". Enjoy your movie!",
    }

   // this.transporter.sendMail(message); //hopefully this sends email to this.userEmail


    alert("Thank you for your purchase. Enjoy your movie!")

    this.purchaseTotalAmt = 0;
    this.purchasedDate = new Date();


  }
  */


}

