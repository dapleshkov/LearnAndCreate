package com.lac.service;

import com.lac.model.Course;
import com.lac.model.User;
import com.lac.repository.CourseRepository;
import com.lac.repository.UserRepository;
import com.lac.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoursesService {

    @Autowired
    CourseRepository courseRepository;
    @Autowired
    UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(CoursesService.class);

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getCoursesByUser(User user) {
        return (List<Course>) user.getCourses();
    }

    public boolean addCourse(Course course) {
        if (!courseRepository.existsByTitleAndDescription(course.getTitle(), course.getDescription())) {
            courseRepository.save(course);
            return true;
        }
        return false;
    }

    public boolean subscribeCourse(UserPrincipal currentUser, Long courseId) {
        if (currentUser != null) {
            User user = userRepository.findByUserId(currentUser.getUserId());
            if (courseRepository.findByCourseId(courseId) != null) {
                user.subscribe(courseRepository.findByCourseId(courseId));
                userRepository.save(user);
                return true;
            }
            return false;
        }
        return false;
    }

    public boolean unsubscribeCourse(UserPrincipal currentUser, Long courseId) {
        if (currentUser != null) {
            User user = userRepository.findByUserId(currentUser.getUserId());
            if (courseRepository.findByCourseId(courseId) != null) {
                user.unsubscribe(courseRepository.findByCourseId(courseId));
                userRepository.save(user);
                return true;
            }
            return false;
        }
        return false;
    }
}
