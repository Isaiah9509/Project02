package com.revature.controllers;

import com.revature.models.Purchase;
import com.revature.models.Ticket;
import com.revature.models.User;
import com.revature.repository.PurchaseRepository;
import com.revature.services.PurchaseService;
import com.revature.services.TicketService;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Controller
@RequestMapping("/purchase")
@CrossOrigin("*")
public class PurchaseController {
    private UserService us;
    private PurchaseService ps;
    private TicketService ts;
    private PurchaseRepository pr;

    public PurchaseController(){}

    @Autowired
    public PurchaseController(PurchaseService ps, UserService us, TicketService ts) {
        this.ps = ps;
        this.us = us;
        this.ts = ts;
    }

  /*
    @PostMapping("/")
    @ResponseBody
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        System.out.println("Made it to back end! Inside createPurchase");

        User owner = new User();
     //   owner.setId(id);
        purchase.setOwner(owner);
        return ps.createPurchase(purchase);

    }
*/

    @PostMapping("/{ownerId}")
    @ResponseBody
    public Purchase createPurchase(@RequestBody Purchase purchase, @PathVariable("ownerId")String ownerId) {
        System.out.println("Made it to back end! Inside createPurchase");
        purchase.setOwner(us.getUserById(Integer.parseInt(ownerId)));


        return ps.createPurchase(purchase);
    }

    @GetMapping("/")
    @ResponseBody
    public List<Purchase> getAllPurchases(){
        return ps.getAllPurchases();
    }

    @GetMapping("/user/{id}")
    @ResponseBody
    public List<Purchase> getPurchaseByUserId(@PathVariable("id")int id) {
         User user = us.getUserById(id);

         return ps.getPurchasesByUser(user);
    }

//    @GetMapping("/purchase/{purchaseId}")
//    @ResponseBody
//    public List<Ticket> getAllTicketsByPurchaseId(@PathVariable("purchaseId")int purchaseId) {
//        Purchase purchase = ps.getPurchaseById(purchaseId);
//
//        return ts.getTicketByPurchaseId(ticket);
//    }

    @DeleteMapping("/{purchaseId}")
    @ResponseBody
    boolean deletePurchaseById(@PathVariable("purchaseId")int purchaseId) {
        Purchase purchase = ps.getPurchaseById(purchaseId);
        ps.deletePurchase(purchase);

        return true;
    }

    @GetMapping("/price")
    @ResponseBody
    public double getPrice(@RequestBody int id) {
        return ps.getPrice(id);
    }
}
