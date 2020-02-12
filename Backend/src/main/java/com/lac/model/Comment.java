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

    @NotBlank
    @Column(name = "date_creation")
    private Date date;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(name = "comment_user",
            joinColumns = @JoinColumn(name = "comment_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private User user = new User();

    public Comment(){

    }

    public Comment(Long commentId, String text, Date date){
        this.commentId = commentId;
        this.text = text;
        this.date = date;
    }
}
