package com.revature.repository;

import com.revature.models.Purchase;
import com.revature.models.Ticket;
import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {
    List<Purchase> findAllByOwner(User user);


    Purchase getById(int id);
    double getPurchasePriceById(int id);
    List<Ticket> getAllTicketsById(int id);

      @Modifying
      @Query("update Ticket t set t.purchase = ?1 where t.id = ?2")
      void setPurchaseFieldForTicketItem(Purchase purchase, int id);

}

