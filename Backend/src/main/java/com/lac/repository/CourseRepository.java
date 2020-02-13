package com.lac.repository;

import com.lac.model.Comment;
import com.lac.model.Course;
import com.lac.security.UserPrincipal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
//    public boolean subscribeCourse(UserPrincipal currentUser, Long courseId);
//    public boolean unsubscribeCourse(UserPrincipal currentUser, Long courseId);
//    public List<Comment> getAllCommentsByCourseId(Long courseId);
}
