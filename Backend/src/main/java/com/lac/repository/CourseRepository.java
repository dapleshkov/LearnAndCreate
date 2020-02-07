package com.lac.repository;

import com.lac.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CourseRepository extends JpaRepository<Course, Long> {
    Course findByCourseId(Long courseId);
    boolean existsByTitleAndDescription(String title, String description);
}