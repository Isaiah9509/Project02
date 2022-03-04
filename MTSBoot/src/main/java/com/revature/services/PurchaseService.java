package com.revature.services;

import com.revature.models.Purchase;
import com.revature.models.Ticket;
import com.revature.models.User;
import com.revature.repository.PurchaseRepository;
import com.revature.repository.TicketRepository;
import com.revature.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Service
@Transactional
public class PurchaseService {
    private PurchaseRepository pr;
    private EmailService es;

    public PurchaseService() {}

    @Autowired
    public PurchaseService(PurchaseRepository pr){
        this.pr = pr;
    }

    public List<Purchase> getAllPurchases(){
        return pr.findAll();
    }

    //function used to update DB w/ populated purchase object
    public Purchase createPurchase(Purchase purchase) {


        Purchase newPurchase = new Purchase();
        newPurchase.setOwner(newPurchase.getOwner());
        Date date = new Date(System.currentTimeMillis());
        newPurchase.setPurchaseDate(date);
        newPurchase.setPrice(purchase.getPrice(purchase));
        newPurchase.setOwner(purchase.getOwner());
//        //before returning, you should delete from saved tickets
//
////        for(int i = 0; i<newPurchase.getTickets().size(); i++){
////            Ticket ticket = newPurchase.getTickets().get(i);
////            ticket.setPurchase(newPurchase);
////            tr.save(ticket);
////        }

        newPurchase.setTickets(purchase.getTickets());



        return pr.save(newPurchase); //send to DB
    }

    public Purchase getPurchaseById(int id) {
        return pr.getById(id);
    }
/*
    public void setPurchaseId(int id) {
        pr.setId(id);
    }
*/

    //get total cost

    public double getPrice(int id) {
        return pr.getPurchasePriceById(id);
    }

    public List<Purchase> getPurchasesByUser(User user){
        return pr.findAllByOwner(user);
    }

    public void deletePurchase(Purchase purchase) {
       pr.delete(purchase);
    }



    public List<Ticket> getTickets(int id) {
        return pr.getAllTicketsById(id);
    }


}
