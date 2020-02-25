package com.lac.payload;

import javax.validation.constraints.NotBlank;

public class MarkRequest {
    @NotBlank
    private Integer mark;

    public Integer getMark() {
        return mark;
    }

    public void setMark(Integer mark) {
        this.mark = mark;
    }
}
