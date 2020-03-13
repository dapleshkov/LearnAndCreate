package com.lac.controller;

import com.lac.model.Comment;
import com.lac.model.Lesson;
import com.lac.model.Video;
import com.lac.payload.CommentRequest;
import com.lac.payload.UploadFileResponse;
import com.lac.repository.LessonRepository;
import com.lac.repository.UserRepository;
import com.lac.security.CurrentUser;
import com.lac.security.UserPrincipal;
import com.lac.service.CommentService;
import com.lac.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("api/lesson")
public class LessonController {
    @Autowired
    CommentService commentService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VideoService videoService;

    @Autowired
    private LessonRepository lessonRepository;

    @PostMapping("{lessonId}/comment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Comment> addCommentToLesson(@CurrentUser UserPrincipal currentUser,
                                                      @Valid @RequestBody CommentRequest request,
                                                      @PathVariable("lessonId") Long lessonId) {
        Comment comment = new Comment(request.getText());
//        comment.setDate(new Date());
        comment.setUser(userRepository.findByUserId(currentUser.getUserId()));
        boolean flag = commentService.addCommentToLesson(lessonId, comment);
        if (!flag)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @PostMapping("{lessonId}/video")
    public UploadFileResponse addVideoToLesson(@PathVariable("lessonId") Long lessonId,
                                               @RequestParam("video") MultipartFile file) throws IOException {
        Video video = videoService.store(file);
        UploadFileResponse response = new UploadFileResponse(video.getUrl(), video.getType(), file.getSize());

        Lesson lesson = lessonRepository.findByLessonId(lessonId);
        lesson.setVideo(video);
        lessonRepository.save(lesson);

        return response;
    }
}
