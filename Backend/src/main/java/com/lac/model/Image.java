package com.lac.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "images")
public class Image extends File {

    public Image() {
        super();
    }

    public Image(String url, String type) {
        super(url, type);
    }
}