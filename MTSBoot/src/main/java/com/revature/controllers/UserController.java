package com.revature.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.exceptions.NotAValidLogin;
import com.revature.models.User;
import com.revature.repository.UserRepository;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Controller
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    private UserService us;

    public UserController(){
    }

    @Autowired
    public UserController(UserService us){
        this.us = us;
    }

    //This request is used to get all people.
    @GetMapping("/")
    @ResponseBody
    public List<User> getAllPeople(){
        return us.getAllUsers();
    }

    @PostMapping("/")
    @ResponseBody
    public User createUser(@RequestBody User u){

    return us.createNewUser(u.getEmail(), u.getFirst(), u.getLast(), u.getPassword());
    }

    //This is used to update a person by ID.
    @PutMapping("/{id}/update")
    @ResponseBody
    public ResponseEntity<String> updateUser(@PathVariable("id")int id, @RequestBody User user){
        System.out.println(user);
        user.setId(id);
        us.updateUser(user);
        return new ResponseEntity<String>("Information Updated", HttpStatus.OK);
    }

    //This is used to get a user by ID.
    @GetMapping("/{id}")
    @ResponseBody
    public User getUserById(@PathVariable("id")int id){
    return us.getUserById(id);
    }

    //This is used to login a user.
    @PostMapping("/login")
    @ResponseBody
    public User login(@RequestBody User u, HttpServletResponse response) throws NotAValidLogin {

        System.out.println(u.getEmail() + " " + u.getPassword());
        User test = us.login(u);

        System.out.println(test);
        //Testing if the user exists.
        if(test != null){
            //If the user exists, return a cookie with their ID and set it's expiration to 7 days.
            Cookie cookie = new Cookie("id", ""+test.getId());
            cookie.setMaxAge(7 * 24 * 60 * 60);
            cookie.setPath("/");
            response.addCookie(cookie);
            return test;
        }
        return null;
    }

    //THis is used to log a user out.
    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("id", null);
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return new ResponseEntity<String>("User has been logged out.", HttpStatus.OK);
    }



}
