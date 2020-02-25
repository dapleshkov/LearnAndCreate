package com.lac.service;

import com.lac.model.User;
import com.lac.repository.UserRepository;
import com.lac.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public boolean editUsername(UserPrincipal currentUser, String username){
        if (username.length() > 15 || username.length() < 4)
            return false;
        User user = userRepository.findByUserId(currentUser.getUserId());
        user.setUsername(username);
        userRepository.save(user);
        return true;
    }

    public boolean editName(UserPrincipal currentUser, String name){
        if (name.length() > 20 || name.length() < 2)
            return false;
        User user = userRepository.findByUserId(currentUser.getUserId());
        user.setName(name);
        userRepository.save(user);
        return true;
    }

    public boolean editPassword(UserPrincipal currentUser, String password){
        if (password.length() < 4 || password.length() > 20)
            return false;

        User user = userRepository.findByUserId(currentUser.getUserId());
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        return true;
    }
}
