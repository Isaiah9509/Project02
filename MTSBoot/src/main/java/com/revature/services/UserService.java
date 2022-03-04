package com.revature.services;

import com.revature.exceptions.NotAValidLogin;
import com.revature.models.Ticket;
import com.revature.models.User;
import com.revature.repository.TicketRepository;
import com.revature.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    private UserRepository ur;

    @Autowired
    public UserService(UserRepository ur){
        this.ur = ur;
    }

    public UserService(){}

    public User createNewUser(String email, String first, String last, String password){
        User u = new User(first, last, email, password);
        System.out.print(u);
        return ur.save(u);
    }

    public List<User> getAllUsers(){
        return ur.findAll();
    }

    public User getUserById(int id) {
        return ur.getById(id);
    }

    public User login(User user) throws NotAValidLogin {
        User info = ur.findUserByEmail(user.getEmail());
        if(info!= null && info.getPassword().equals(user.getPassword())){
            return info;
        }
        return null;
    }

    public void updateUser(User u){
        ur.save(u);
    }



}
