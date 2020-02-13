package com.lac.controller;


import com.lac.model.Comment;
import com.lac.model.Course;
import com.lac.model.Image;
import com.lac.payload.CommentRequest;
import com.lac.payload.CourseRequest;
import com.lac.payload.UploadFileResponse;
import com.lac.repository.CommentRepository;
import com.lac.repository.CourseRepository;
import com.lac.repository.CoursesRepository;
import com.lac.repository.UserRepository;
import com.lac.security.CurrentUser;
import com.lac.security.UserPrincipal;
import com.lac.service.CommentService;
import com.lac.service.CourseService;
import com.lac.service.CoursesService;
import com.lac.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/course/")
public class CourseController {

    @Autowired
    CommentService commentService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private CoursesRepository coursesRepository;

    @GetMapping("{courseId}/comment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Set<Comment>> getAllCourseComments(@PathVariable("courseId") Long courseId) {
        Set<Comment> comments = courseService.getAllCommentsByCourseId(courseId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PostMapping("{courseId}/comment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addCommentToCourse(@CurrentUser UserPrincipal currentUser,
                                                @Valid @RequestBody CommentRequest request,
                                                @PathVariable("courseId") Long courseId) {
        Comment comment = new Comment(request.getText());
        comment.setDate(new Date());
        comment.setUser(userRepository.findByUserId(currentUser.getUserId()));
        boolean flag = commentService.addCommentToCourse(courseId, comment);
        if (!flag)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("{lessonId}/comment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Comment> addCommentToLesson(@CurrentUser UserPrincipal currentUser,
                                                @Valid @RequestBody CommentRequest request,
                                                @PathVariable("lessonId") Long lessonId) {
        Comment comment = new Comment(request.getText());
        comment.setDate(new Date());
        comment.setUser(userRepository.findByUserId(currentUser.getUserId()));
        boolean flag = commentService.addCommentToLesson(lessonId, comment);
        if (!flag)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @PostMapping("/{courseId}/image")
    public UploadFileResponse setCourseImage(@RequestParam(name = "file") MultipartFile file,
                                             @PathVariable("courseId") Long courseId) throws IOException {
        Course course = coursesRepository.findByCourseId(courseId);

        Image image = imageService.store(file);
        course.setImage(image);
        coursesRepository.save(course);

        return new UploadFileResponse(image.getName(), image.getType(), file.getSize());
    }

    @PostMapping("/{courseId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> subscribeCourse(@CurrentUser UserPrincipal currentUser,
                                                @PathVariable("courseId") Long courseId) {
        boolean flag = courseService.subscribeCourse(currentUser, courseId);
        if (flag)
            return new ResponseEntity<>(HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    @DeleteMapping("/{courseId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> unsubscribeCourse(@CurrentUser UserPrincipal currentUser,
                                                  @PathVariable("courseId") Long courseId) {
        boolean flag = courseService.unsubscribeCourse(currentUser, courseId);
        if (flag)
            return new ResponseEntity<>(HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.CONFLICT);
    }
}
