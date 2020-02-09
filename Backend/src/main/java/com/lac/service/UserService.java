package com.lac.service;

import com.lac.model.User;
import com.lac.repository.UserRepository;
import com.lac.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public boolean editUsername(UserPrincipal currentUser, String username){
        if (username.length() > 15 || username.length() < 4)
            return false;
        if (userRepository.existsByUsernameOrEmail(username, username))
            return false;

        User user = userRepository.findByUserId(currentUser.getUserId());
        user.setUsername(username);
        userRepository.save(user);
        return true;
    }
}
