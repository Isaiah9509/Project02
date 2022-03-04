package com.revature.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name ="tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ticket_id")
    private int id;

    @Column(name = "movie_title",nullable = false)
    private String movieTitle;

    @Column(name="price", nullable = false)
    private double price;

    @Column(name="genre")
    private String genre;

    @Column(name="showTimeSlot")
    private String showTimeSlot;

    @Column(name="showTime")
    private String showTime;

    @ManyToOne(fetch =FetchType.LAZY)
    @JoinColumn(name="purchase_id")
    @JsonIgnore
    public Purchase purchase;

    @ManyToOne(fetch =FetchType.LAZY)
    @JoinColumn(name="owner")
    @JsonIgnore
    private User owner;  //unique, null.

    public Ticket() {
    }

    public Ticket(int id, String movieTitle, double price, String genre, String showTimeSlot, String showTime, Purchase purchase, User owner) {
        this.id = id;
        this.movieTitle = movieTitle;
        this.price = price;
        this.genre = genre;
        this.showTimeSlot = showTimeSlot;
        this.showTime = showTime;
        this.purchase = purchase;
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "id=" + id +
                ", movieTitle='" + movieTitle + '\'' +
                ", price=" + price +
                ", genre='" + genre + '\'' +
                ", showTimeSlot='" + showTimeSlot + '\'' +
                ", showTime='" + showTime + '\'' +
                ", purchase=" + purchase +
                ", owner=" + owner +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getShowTimeSlot() {
        return showTimeSlot;
    }

    public void setShowTimeSlot(String showTimeSlot) {
        this.showTimeSlot = showTimeSlot;
    }

    public String getShowTime() {
        return showTime;
    }

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }

    public Purchase getPurchase() {
        return purchase;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}




