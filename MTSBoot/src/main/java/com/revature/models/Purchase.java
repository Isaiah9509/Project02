package com.revature.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.persistence.Table;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.sql.Date;

import static com.fasterxml.jackson.databind.cfg.CoercionInputShape.Array;

@Entity
@Table(name="purchases")
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="purchase_id")
    private int id;

    @Column(name="purchase_date", nullable = false)
    private Date purchaseDate;

    @Column(name="purchase_price", nullable = false)
    private double purchasePrice;

    @ManyToOne(fetch = FetchType.LAZY) //removed @CascadeType.All
    @JoinColumn(name="owner")
    @JsonIgnore
    private User owner;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.MERGE)
    private List<Ticket> tickets = new ArrayList<Ticket>();


    public Purchase() {}

    public Purchase(int id, Date purchaseDate, double purchasePrice, User owner, List<Ticket> tickets) {
        this.id = id;
        this.purchaseDate = purchaseDate;
        this.purchasePrice = purchasePrice;
        this.owner = owner;
        this.tickets = tickets;
    }

    public Purchase(int id, Date purchaseDate, User user) {
        this.id = id;
        this.purchaseDate = purchaseDate;
        this.owner = user;
    }

    public Purchase(double price, User owner) {
        this.purchasePrice = price;
        this.owner = owner;
        this.purchaseDate = new Date(System.currentTimeMillis());
    }


    public void setPrice(double price){
        this.purchasePrice = price;
    }

    public double getPrice(Purchase purchase){
        return purchase.purchasePrice;
    }

    public int getPurchaseId() {
        return id;
    }

    public void setPurchaseId(int purchaseId) {
        this.id = purchaseId;
    }

    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
    }


    public User getOwner() {
        return this.owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }
}
