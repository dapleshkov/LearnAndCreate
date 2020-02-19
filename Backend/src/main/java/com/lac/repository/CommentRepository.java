package com.lac.repository;

import com.lac.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Comment findCommentByCommentId(Long commentId);

    void deleteCommentByCommentId(Long commentId);

    void deleteByCommentId(Long commentId);

}
