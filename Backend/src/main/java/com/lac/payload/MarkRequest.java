package com.lac.payload;

import javax.validation.constraints.NotBlank;

public class MarkRequest {
    private Long mark;

    public Long getMark() {
        return mark;
    }

    public void setMark(Long mark) {
        this.mark = mark;
    }
}
