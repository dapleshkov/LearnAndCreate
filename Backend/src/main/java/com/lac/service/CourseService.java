package com.lac.service;

import com.lac.model.Comment;
import com.lac.model.Course;
import com.lac.model.User;
import com.lac.repository.CommentRepository;
import com.lac.repository.CoursesRepository;
import com.lac.repository.UserRepository;
import com.lac.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class CourseService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    CoursesRepository coursesRepository;


    @Autowired
    UserRepository userRepository;


    public boolean subscribeCourse(UserPrincipal currentUser, Long courseId) {
        if (currentUser != null) {
            User user = userRepository.findByUserId(currentUser.getUserId());
            if (coursesRepository.findByCourseId(courseId) != null) {
                user.subscribe(coursesRepository.findByCourseId(courseId));
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
            if (coursesRepository.findByCourseId(courseId) != null) {
                user.unsubscribe(coursesRepository.findByCourseId(courseId));
                userRepository.save(user);
                return true;
            }
            return false;
        }
        return false;
    }

    public Set<Comment> getAllCommentsByCourseId(Long courseId) {
        Course course = coursesRepository.findByCourseId(courseId);
        return course.getComments();
    }

    public void addNewCommentToCourse(Comment comment){
        commentRepository.save(comment);
    }
}
