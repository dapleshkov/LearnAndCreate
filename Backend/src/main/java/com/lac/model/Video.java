package com.lac.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "videos")
public class Video extends File {

    public Video() {
        super();
    }

    public Video(String url, String type) {
        super(url, type);
    }
}
