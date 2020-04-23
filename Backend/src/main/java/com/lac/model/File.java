package com.lac.model;

import javax.persistence.*;

@Entity
@Table(name = "files")
@Inheritance(strategy = InheritanceType.JOINED)
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    private String url;

    private String type;

    public File() {

    }

    public File(String url, String type) {
        this.url = url;
        this.type = type;
    }

    public Long getFileId() {
        return fileId;
    }

    public String getUrl() {
        return url;
    }

    public String getType() {
        return type;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setType(String type) {
        this.type = type;
    }
}
