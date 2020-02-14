package com.lac.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Table(name = "comments")
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @NotBlank
    @Size(max = 10000)
    private String text;
//
//    @NotBlank
//    @Column(name = "date_creation")
//    private Date date;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(name = "comment_user",
            joinColumns = @JoinColumn(name = "comment_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private User user = new User();

    public Comment(){

    }

    public Comment(String text){
        this.text = text;
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
//
//    public Date getDate() {
//        return date;
//    }
//
//    public void setDate(Date date) {
//        this.date = date;
//    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
