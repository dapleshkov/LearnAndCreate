package com.lac.controller;

import com.lac.model.Category;
import com.lac.model.Course;
import com.lac.model.User;
import com.lac.payload.CourseRequest;
import com.lac.repository.CategoryRepository;
import com.lac.repository.UserRepository;
import com.lac.security.CurrentUser;
import com.lac.security.UserPrincipal;
import com.lac.service.CoursesService;
import com.lac.service.ImageService;
import com.lac.service.VideoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.persistence.GeneratedValue;
import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/courses")
public class CoursesController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CoursesService coursesService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private VideoService videoService;

    @Autowired
    private CategoryRepository categoryRepository;

    private static final Logger logger = LoggerFactory.getLogger(CoursesController.class);

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = coursesService.getAllCourses();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }


//    @PostMapping("/{courseId}/videos")
//    public List<UploadFileResponse> setCourseVideos(@RequestParam(name = "files") MultipartFile[] files,
//                                                    @PathVariable("courseId") Long courseId) throws IOException {
//        Course course = courseRepository.findByCourseId(courseId);
//
//        Set<Video> videos = new HashSet<>();
//        List<UploadFileResponse> responses = new ArrayList<>();
//
//        for (MultipartFile file : files) {
//            Video video = videoService.store(file);
//            videos.add(video);
//            responses.add(new UploadFileResponse(video.getName(), video.getType(), file.getSize()));
//        }
//
//        course.setVideos(videos);
//        courseRepository.save(course);
//
//        return responses;
//    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getCoursesByUserId(@PathVariable("userId") Long userId) {
        User user = userRepository.findByUserId(userId);
        if (user != null) {
            Set<Course> courses = user.getCourses();
            return new ResponseEntity<>(courses, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyCourses(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUserId(currentUser.getUserId());
        if (user != null) {
            Set<Course> courses = user.getCourses();
            return new ResponseEntity<>(courses, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping
    public ResponseEntity<Void> addCourse(@Valid @RequestBody CourseRequest request) {
        Category category = categoryRepository.findByName(request.getCategoryName());
        Course course = new Course(request.getTitle(), request.getDescription(), category);
        boolean flag = coursesService.addCourse(course);
        if (!flag)
            return new ResponseEntity<>(HttpStatus.CONFLICT);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/courses/{title}")
                .buildAndExpand(course.getCourseId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getCoursesByCategoryId(@PathVariable("categoryId") Long categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId);
        List<Course> courses = coursesService.getCoursesByCategory(category);
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }
}
