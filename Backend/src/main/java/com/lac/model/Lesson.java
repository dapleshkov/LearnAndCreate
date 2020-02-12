//package com.lac.model;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import javax.persistence.*;
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.Size;
//import java.util.HashSet;
//import java.util.Set;
//
//@Table(name = "lessons")
//@Entity
//public class Lesson {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "course_id")
//    private Long courseId;
//
//    @NotBlank
//    @Size(max = 100)
//    private String title;
//
//    @NotBlank
//    @Size(max = 10000)
//    private String description;
//
//    @OneToOne
//    @JoinTable(name = "lesson_image",
//            joinColumns = @JoinColumn(name = "lesson_id"),
//            inverseJoinColumns = @JoinColumn(name = "file_id"))
//    private Image image;
//
//    @OneToMany(fetch = FetchType.LAZY)
//    @JsonIgnore
//    @JoinTable(name = "course_lessons",
//            joinColumns = @JoinColumn(name = "lesson_id"),
//            inverseJoinColumns = @JoinColumn(name = "course_id"))
//    private Set<User> users = new HashSet<>();
//
//    @OneToOne(fetch = FetchType.LAZY)
//    @JsonIgnore
//    @JoinTable(name = "lesson_video",
//            joinColumns = @JoinColumn(name = "lesson_id"),
//            inverseJoinColumns = @JoinColumn(name = "lesson_id"))
//    private Video video = new Video();
//
//    public  Lesson(){
//
//    }
//
//    public Lesson(Long courseId, String title, String description){
//        this.courseId = courseId;
//        this.title = title;
//        this.description = description;
//    }
//}
