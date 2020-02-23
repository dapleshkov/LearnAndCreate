package com.lac.controller;


import com.lac.model.Comment;
import com.lac.model.Course;
import com.lac.model.Image;
import com.lac.model.Lesson;
import com.lac.payload.ApiResponse;
import com.lac.payload.CommentRequest;
import com.lac.payload.LessonRequest;
import com.lac.payload.UploadFileResponse;
import com.lac.repository.CommentRepository;
import com.lac.repository.CourseRepository;
import com.lac.repository.LessonRepository;
import com.lac.repository.UserRepository;
import com.lac.security.CurrentUser;
import com.lac.security.UserPrincipal;
import com.lac.service.CommentService;
import com.lac.service.CourseService;
import com.lac.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
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
    private CourseRepository courseRepository;

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
//        comment.setDate(new Date());
        comment.setUser(userRepository.findByUserId(currentUser.getUserId()));
        boolean flag = commentService.addCommentToCourse(courseId, comment);
        if (!flag)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/{courseId}/image")
    public UploadFileResponse setCourseImage(@RequestParam(name = "file") MultipartFile file,
                                             @PathVariable("courseId") Long courseId) throws IOException {
        Course course = courseRepository.findByCourseId(courseId);

        Image image = imageService.store(file);
        course.setImage(image);
        courseRepository.save(course);

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

    @PostMapping("{courseId}/lesson")
    public ResponseEntity<?> addLesson(@PathVariable("courseId") Long courseId,
                                       @Valid @RequestBody LessonRequest lessonRequest) {
        Lesson lesson = new Lesson();
        lesson.setTitle(lessonRequest.getTitle());
        lesson.setDescription(lessonRequest.getDescription());
        lesson.setDuration(lessonRequest.getDuration());

        boolean flag = courseService.addLesson(courseId, lesson);

        if (flag)
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{courseId}/lessons")
    public ResponseEntity<List<Lesson>> getCourseLessons(@PathVariable("courseId") Long courseId) {
        List<Lesson> lessons = courseService.getLessonsByCourseId(courseId);
        return new ResponseEntity<>(lessons, HttpStatus.OK);
    }

    @GetMapping("/{courseId}/lesson/{lessonId}/next")
    public ResponseEntity<?> getNextLesson(@PathVariable("courseId") Long courseId,
                                                @PathVariable("lessonId") Long lessonId) {
        Lesson lesson = courseService.getNextLesson(courseId, lessonId);
        if (lesson != null)
            return new ResponseEntity<>(lesson, HttpStatus.OK);
        return new ResponseEntity<>(new ApiResponse(false, "Next lesson doesn't exist"), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{courseId}/lesson/{lessonId}/previous")
    public ResponseEntity<?> getPreviousLesson(@PathVariable("courseId") Long courseId,
                                               @PathVariable("lessonId") Long lessonId) {
        Lesson lesson = courseService.getPreviousLesson(courseId, lessonId);
        if (lesson != null)
            return new ResponseEntity<>(lesson, HttpStatus.OK);
        return new ResponseEntity<>(new ApiResponse(false, "Previous lesson doesn't exist"), HttpStatus.BAD_REQUEST);
    }
}
