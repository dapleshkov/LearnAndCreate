package com.lac.service;

import com.lac.model.Course;
import com.lac.model.User;
import com.lac.repository.CourseRepository;
import com.lac.repository.CoursesRepository;
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
    CoursesRepository coursesRepository;

    @Autowired
    UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(CoursesService.class);

    public List<Course> getAllCourses() {
        return coursesRepository.findAll();
    }

    public List<Course> getCoursesByUser(User user) {
        return (List<Course>) user.getCourses();
    }

    public boolean addCourse(Course course) {
        if (!coursesRepository.existsByTitleAndDescription(course.getTitle(), course.getDescription())) {
            coursesRepository.save(course);
            return true;
        }
        return false;
    }
}
