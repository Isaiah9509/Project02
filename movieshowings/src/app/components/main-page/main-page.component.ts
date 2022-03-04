import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie, IMovieDetail } from 'src/app/interfaces/imovie';
import { ITicket } from 'src/app/interfaces/ITicket';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { SetAndGetTicketsService } from 'src/app/services/set-and-get-tickets.service';
import { TicketServiceService } from 'src/app/services/ticket-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router, private movieService:MovieServiceService, private ticketService:TicketServiceService, private get:SetAndGetTicketsService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  //Need to populate page with Movie information

  //Movie object
  movieList: IMovie = new IMovie();

  movie:IMovieDetail = {
    title:"",
    releaseState:"",
    image:"",
    genres:"",
  }


  ticketList: ITicket[] = [];

  ticketDays = [
    {id: 1, name: "Monday"},
    {id: 2, name: "Tuesday"},
    {id: 3, name: "Wednesday"},
    {id: 4, name: "Thursday"},
    {id: 5, name: "Friday"}
  ];

  ticketTimes = [
  {id: 1, name: "5:00PM"},
  {id: 2, name: "8:00PM"},
  {id: 3, name: "10:00PM"}
  ];

  ticketAmounts = [
    {id: 1, name: "1"},
    {id: 2, name: "2"},
    {id: 3, name: "3"}
    ];

    ticketInfo = [
      this.ticketDays,
      this.ticketTimes,
      this.ticketAmounts
    ];
  

  ticketTime = "";
  ticketDay = "";
  ticketAmount = null;

  ticket: ITicket = {
    price: 15.99,
    movieTitle: "",
    genre: "",
    showTime:"",
    showTimeSlot:"",
    owner:{
      id: "",
      email:"",
      password:""
    },
  }


  purchaseTickets(pageMovie:IMovieDetail, ticketDay:any, ticketTime:any, ticketAmount:any){
    console.log("Purchase Tickets has been called");
  }


  //We need to be able to populate a ticket object to send to our back end.
  saveTickets(pageMovie:IMovieDetail, ticketDay: any, ticketTime: any, ticketAmount:any){
    console.log("saveTickets function called");
    console.log(pageMovie.title);
    console.log(ticketDay);
    console.log(ticketTime);
    console.log(ticketAmount);

    //Setting up our ticket to send back
    this.ticket.movieTitle = pageMovie.title;
    this.ticket.genre = pageMovie.genres;
    this.ticket.showTime = ticketDay.name;
    this.ticket.showTimeSlot = ticketTime.name;
    console.log(this.ticket);

    let id = this.getCookie("id");

    for (let i = 0; i < ticketAmount.id; i++){
    this.ticketService.createTickets(this.ticket, id)
      .subscribe((data) => {
        console.log(data);
      });
    }


  }

  getMovies(){

    this.movieService.getMovies()
    .subscribe((data) => {
      console.log(data);

      this.movieList = data;

    });

  }


  getCookie(cname:any) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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

}
