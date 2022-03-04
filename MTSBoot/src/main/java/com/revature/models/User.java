package com.revature.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
public class User {
    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    //Database Values
    @Id
    @Column(name="userId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="first_name", nullable = false)
    private String first;

    @Column(name="last_name", nullable = false)
    private String last;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="password", nullable = false)
    private String password;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Purchase> purchases = new ArrayList<>();

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Ticket> tickets = new ArrayList<>();

    public User(){

    }

    public User(String first, String last, String email, String password) {
        this.first = first;
        this.last = last;
        this.email = email;
        this.password = password;
    }

    public List<Purchase> getPurchases() {
        return purchases;
    }

    public void setPurchases(List<Purchase> purchases) {
        this.purchases = purchases;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirst() {
        return first;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getLast() {
        return last;
    }

    public void setLast(String last) {
        this.last = last;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", first='" + first + '\'' +
                ", last='" + last + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
