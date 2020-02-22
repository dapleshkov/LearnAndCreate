package com.lac.repository;

import com.lac.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Comment findCommentByCommentId(Long commentId);

    void deleteCommentByCommentId(Long commentId);

    @Modifying
    @Transactional
    void removeCommentByCommentId(Long commentId);

}
