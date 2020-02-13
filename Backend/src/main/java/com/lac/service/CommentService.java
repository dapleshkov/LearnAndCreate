package com.lac.service;

import com.lac.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    public boolean addCommentToCourse(Long courseId, Comment comment){
        return false;
    }

    public boolean addCommentToLesson(Long lessonId, Comment comment){
        return false;
    }
}
