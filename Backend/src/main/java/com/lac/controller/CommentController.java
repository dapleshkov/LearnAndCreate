package com.lac.controller;

import com.lac.model.Comment;
import com.lac.payload.CommentRequest;
import com.lac.security.CurrentUser;
import com.lac.security.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.UsesSunHttpServer;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/comment")
public class CommentController {

    @DeleteMapping("{commentId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteComment(@CurrentUser UserPrincipal userPrincipal,
            @RequestBody CommentRequest request, @PathVariable("commentId") Long commentId) {

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
