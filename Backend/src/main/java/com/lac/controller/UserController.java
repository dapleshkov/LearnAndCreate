package com.lac.controller;

import com.lac.model.Image;
import com.lac.model.User;
import com.lac.payload.ApiResponse;
import com.lac.payload.UploadFileResponse;
import com.lac.repository.UserRepository;
import com.lac.security.CurrentUser;
import com.lac.security.UserPrincipal;
import com.lac.service.ImageService;
import com.lac.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private  UserService userService;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<User> getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUserId(currentUser.getUserId());
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PutMapping("/user/me/edit/name")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> editName(@CurrentUser UserPrincipal currentUser,
                                         @RequestParam(name = "name") String name) {
        if(userService.editName(currentUser, name))
            return new ResponseEntity<>(new ApiResponse(true, "Name was edited successfully"), HttpStatus.OK);
        return new ResponseEntity<>(new ApiResponse(false, "Name was not edited. Name is incorrect"), HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/user/me/edit/username")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> editUsername(@CurrentUser UserPrincipal currentUser,
                                          @RequestParam(name = "username") String username) {

        if(userService.editUsername(currentUser, username))
            return new ResponseEntity<>(new ApiResponse(true, "Username was edited successfully"), HttpStatus.OK);
        if (userRepository.existsByUsername(username))
            return new ResponseEntity<>(new ApiResponse(false, "Username was not edited. The username is already taken"), HttpStatus.BAD_REQUEST);
        return new  ResponseEntity<>(new ApiResponse(false, "Username was not edited. The username is incorrect"), HttpStatus.BAD_REQUEST);
    }

    @PutMapping("user/me/edit/password")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> editPassword(@CurrentUser UserPrincipal currentUser,
                                            @RequestParam(name = "password") String password) {
        if(userService.editPassword(currentUser, password))
            return new ResponseEntity<>(new ApiResponse(true, "Password was edited successfully"), HttpStatus.OK);
        return new ResponseEntity<>(new ApiResponse(false, "Password was not edited. Password is incorrect"), HttpStatus.BAD_REQUEST);

    }

    @PostMapping("/user/me/image")
    @PreAuthorize("hasRole('USER')")
    public UploadFileResponse setUserImage(@CurrentUser UserPrincipal currentUser,
                                           @RequestParam("file") MultipartFile file) throws IOException {
        User user = userRepository.findByUserId(currentUser.getUserId());
        Image image = imageService.store(file);

        user.setImage(image);

        userRepository.save(user);

        return new UploadFileResponse(image.getName(), image.getType(), file.getSize());
    }

    @GetMapping("user/me/imagetype")
    public MediaType getImageContentType(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUserId(currentUser.getUserId());
        Image image = user.getImage();
        MediaType mediaType = MediaType.valueOf(image.getType());
        return mediaType;
    }
}
