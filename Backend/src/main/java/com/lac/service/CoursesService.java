package com.lac.service;

import com.lac.model.Category;
import com.lac.model.Course;
import com.lac.model.User;
import com.lac.repository.CourseRepository;
import com.lac.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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

    public List<Course> getCoursesByCategory(Category category) {
        return courseRepository.findAllByCategory(category);
    }

    public List<Course> getCoursesByTitleSubstring(String substring) {
        return courseRepository.findAllByTitleContaining(substring);
    }

    public List<Course> getTopCourses(Pageable pageable) {
        return courseRepository.findTopPopularCourses(pageable);
    }

    public boolean addCourse(Course course) {
        if (!courseRepository.existsByTitleAndDescription(course.getTitle(), course.getDescription())) {
            courseRepository.save(course);
            return true;
        }
        return false;
    }
}
