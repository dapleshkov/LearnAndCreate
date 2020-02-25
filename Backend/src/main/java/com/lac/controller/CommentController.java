package com.lac.controller;

import com.lac.model.Comment;
import com.lac.payload.CommentRequest;
import com.lac.security.CurrentUser;
import com.lac.security.UserPrincipal;
import com.lac.service.CommentService;
import com.lac.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private CommentService commentService;

    @DeleteMapping("{commentId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteComment(@CurrentUser UserPrincipal userPrincipal,
                                           @PathVariable("commentId") Long commentId) {
        if (commentService.deleteComment(userPrincipal.getUserId(), commentId))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PutMapping("{commentId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> editComment(@CurrentUser UserPrincipal userPrincipal,
                                         @RequestBody CommentRequest request,
                                         @PathVariable("commentId") Long commentId) {
        if(commentService.updateComment(userPrincipal.getUserId(), commentId, request.getText()))
            return new ResponseEntity<>(HttpStatus.OK);
        else  return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
