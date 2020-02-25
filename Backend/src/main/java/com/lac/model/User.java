package com.lac.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username"}),
        @UniqueConstraint(columnNames = {"email"})
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @NotBlank
    @Size(max = 20)
    private String name;

    @NotBlank
    @NaturalId(mutable = true)
    @Size(min = 4, max = 15)
    private String username;

    @NotBlank
    @NaturalId(mutable = true)
    @Email
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;

    @OneToOne
    @JoinTable(name = "user_image",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "file_id"))
    private Image image;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(name = "user_courses",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id"))
    private Set<Course> courses = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinTable(name = "user_confirmation",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "confirmation_id"))
    private EmailConfirmation emailConfirmation;

    public User() {

    }

    public User(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Image getImage() {
        return image;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public EmailConfirmation getEmailConfirmation() {
        return emailConfirmation;
    }

    public void setEmailConfirmation(EmailConfirmation emailConfirmation) {
        this.emailConfirmation = emailConfirmation;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void subscribe(Course course) {
        courses.add(course);
    }

    public void unsubscribe(Course course) {
        courses.remove(course);
    }
}
