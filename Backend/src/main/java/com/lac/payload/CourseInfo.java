package com.lac.payload;

public class CourseInfo {

    private final long courseId;
    private final String title;
    private final String description;

    private final String imageUrl;
    private final String category;
    private final double mark;

    private final long marksNumber;
    private final int subsNumber;
    private final int lessonsNumber;
    private final int reviewsNumber;

    public CourseInfo(long courseId, String title, String description,
                      String imageUrl, String category, double mark,
                      long marksNumber, int subsNumber, int lessonsNumber, int reviewsNumber) {

        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.mark = mark;
        this.marksNumber = marksNumber;
        this.subsNumber = subsNumber;
        this.lessonsNumber = lessonsNumber;
        this.reviewsNumber = reviewsNumber;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public String getTitle() {
        return title;
    }

    public double getMark() {
        return mark;
    }

    public int getLessonsNumber() {
        return lessonsNumber;
    }

    public int getReviewsNumber() {
        return reviewsNumber;
    }

    public int getSubsNumber() {
        return subsNumber;
    }

    public long getCourseId() {
        return courseId;
    }

    public long getMarksNumber() {
        return marksNumber;
    }
}
