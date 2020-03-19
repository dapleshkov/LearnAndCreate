package com.lac.service;

import com.lac.model.User;
import com.lac.payload.ApiResponse;
import com.lac.repository.UserRepository;
import com.lac.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
        user.setUsername(username.toLowerCase());
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

    @Autowired
    private AuthenticationManager authenticationManager;

    public ApiResponse editPassword(UserPrincipal currentUser, String oldPassword,
                                    String newPassword, String repeatedPassword){
        User user = userRepository.findByUserId(currentUser.getUserId());
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            oldPassword
                    )
            );
        }
        catch (BadCredentialsException ex) {
            return new ApiResponse(false, "Old password is incorrect");
        }

        if (oldPassword.equals(newPassword))
            return new ApiResponse(false, "New password must be different from old one");
        if (!newPassword.equals(repeatedPassword))
            return new ApiResponse(false, "You repeated the password incorrectly");

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return new ApiResponse(true, "The password was edited");
    }
}
