package com.lac.service;

import com.lac.model.EmailConfirmation;
import com.lac.model.User;
import com.lac.repository.EmailConfirmationRepository;
import com.lac.repository.UserRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final String PASSWORD_TEXT = "Ваш временный пароль: ";
    private static final String CONFIRMATION_CODE = "Ваш код подвтерждения: ";

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailConfirmationRepository emailConfirmationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean sendPassword(String usernameOrEmail) {
        User receiver = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (receiver == null)
            return false;

        SimpleMailMessage message = new SimpleMailMessage();

        String receiverEmail = receiver.getEmail();
        message.setTo(receiverEmail);
        message.setSubject("Смена пароля");

        String newPassword = generateString();
        String text = PASSWORD_TEXT + newPassword;
        message.setText(text);

        receiver.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(receiver);

        javaMailSender.send(message);
        return true;
    }

    public String sendCodeToConfirmEmail(String oldEmail, String newEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        String code = generateString();

        EmailConfirmation confirmation = new EmailConfirmation(code, newEmail);
        User user = userRepository.findByEmail(oldEmail);
        user.setEmailConfirmation(confirmation);
        userRepository.save(user);

        message.setTo(newEmail);
        message.setSubject("Подтверждение новой почты");
        message.setText(CONFIRMATION_CODE + code);

        javaMailSender.send(message);

        return code;
    }

    private String generateString() {
        int length = 7;
        return RandomStringUtils.random(length, true, true);
    }
}
