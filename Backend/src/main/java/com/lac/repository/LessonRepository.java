package com.lac.repository;

import com.lac.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    public Lesson findByLessonId(Long lessonId);
}
