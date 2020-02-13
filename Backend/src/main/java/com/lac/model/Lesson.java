package com.lac.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Table(name = "lessons")
@Entity
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lesson_id")
    private Long lessonId;

    @NotBlank
    @Size(max = 100)
    private String title;

    @NotBlank
    @Size(max = 10000)
    private String description;

    @OneToOne
    @JoinTable(name = "lesson_image",
            joinColumns = @JoinColumn(name = "lesson_id"),
            inverseJoinColumns = @JoinColumn(name = "file_id"))
    private Image image;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(name = "lesson_video",
            joinColumns = @JoinColumn(name = "lesson_id"),
            inverseJoinColumns = @JoinColumn(name = "lesson_id"))
    private Video video = new Video();

    public  Lesson(){

    }

    public Lesson(Long lessonId, String title, String description){
        this.lessonId = lessonId;
        this.title = title;
        this.description = description;
    }
}
