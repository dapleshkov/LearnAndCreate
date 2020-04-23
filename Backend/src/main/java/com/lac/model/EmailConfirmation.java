package com.lac.model;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Table(name = "confirmations")
public class EmailConfirmation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "confirmation_id")
    private Long confirmationId;

    private String code;

    @Email
    private String newEmail;

    public EmailConfirmation(String code, String newEmail) {
        this.code = code;
        this.newEmail = newEmail;
    }

    public EmailConfirmation() {

    }

    public Long getConfirmationId() {
        return confirmationId;
    }

    public String getCode() {
        return code;
    }

    public String getNewEmail() {
        return newEmail;
    }

    public void setConfirmationId(Long confirmationId) {
        this.confirmationId = confirmationId;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setNewEmail(String newEmail) {
        this.newEmail = newEmail;
    }
}
