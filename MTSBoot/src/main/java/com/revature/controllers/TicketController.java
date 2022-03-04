package com.revature.controllers;

import com.revature.models.Purchase;
import com.revature.models.Ticket;
import com.revature.models.User;
import com.revature.services.TicketService;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
    @Controller
    @RequestMapping("/tickets")
    @CrossOrigin("*")
    public class TicketController {

        private TicketService ts;
        private UserService us;
        // no arg constructor
        public TicketController(){

        }
        @Autowired
        public TicketController(TicketService ts, UserService us){
            this.ts = ts;
            this.us = us;
        }


        @GetMapping("/")
        @ResponseBody
        public List<Ticket> getAllTickets(){
            return ts.getAllTickets();
        }

//        @GetMapping("/id")
//        @ResponseBody
//        public Ticket getTicketById(@PathVariable("id") int id){
//            User user = new User
//            return ts.getTicketsByUser(id);
//        }
        @GetMapping("/genre")
        @ResponseBody
        public Ticket getTicketByGenre(@PathVariable("genre") String genre){
            return ts.getTicketByGenre(genre);
        }

        @GetMapping("/movie_title")
        @ResponseBody
        public Ticket getTicketByName(@PathVariable("movie_title")String movie_title){
            return ts.getTicketByName(movie_title);
        }

        @GetMapping("/price")
        @ResponseBody
        public Ticket getTicketByPrice(@PathVariable("price") double price){
            return ts.getTicketByPrice(price);
        }

        @PostMapping("/purchased")
        @ResponseBody
        public Ticket createTicket(@RequestBody Ticket ticket) {
            System.out.println(ticket);
            return ts.createTicket(ticket);
        }

        @PostMapping("/update/{purchaseID}/{ownerID}")
        @ResponseBody
        public Ticket updateTicketPurchase(@RequestBody Ticket ticket, @PathVariable int purchaseID,@PathVariable int ownerID){

            return ts.updateTicket(ticket, purchaseID, ownerID);
        }

        @PostMapping("/save/{id}")
        @ResponseBody
        public Ticket saveTicket(@RequestBody Ticket ticket, @PathVariable int id) {
            User user = new User();
            user.setId(id);
            ticket.setOwner(user);
            return ts.createTicket(ticket);
        }

        @GetMapping("/save/{id}")
        @ResponseBody
        public List<Ticket> getTicketsByOwner(@PathVariable("id")int id) {
            User user = us.getUserById(id);

            return ts.getTicketsByUser(user);
        }


    }

