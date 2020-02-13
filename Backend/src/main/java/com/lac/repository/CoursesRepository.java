package com.lac.repository;

import com.lac.model.Comment;
import com.lac.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CoursesRepository extends JpaRepository<Course, Long> {
    Course findByCourseId(Long courseId);

    boolean existsByTitleAndDescription(String title, String description);

}