package com.lac.service;

import com.lac.model.Comment;
import com.lac.model.Course;
import com.lac.model.Lesson;
import com.lac.model.User;
import com.lac.repository.CommentRepository;
import com.lac.repository.CourseRepository;
import com.lac.repository.LessonRepository;
import com.lac.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AfterDomainEventPublication;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    CourseRepository courseRepository;

//    public boolean deleteComment(Long userId, Long commentId, Comment comment){
//        if(userId == )
//    }

    public boolean addCommentToCourse(Long courseId, Comment comment){
        Course course = courseRepository.findByCourseId(courseId);
        if( course !=null){
            course.addComment(comment);
            commentRepository.save(comment);
            return true;
        }
        return false;
    }

    public boolean addCommentToLesson(Long lessonId, Comment comment){
        Lesson lesson = lessonRepository.findByLessonId(lessonId);
        if( lesson !=null){
            lesson.addComment(comment);
            commentRepository.save(comment);
            return true;
        }
        return false;
    }
}
