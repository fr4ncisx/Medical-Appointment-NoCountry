package com.healthcare.domain.service;

import com.healthcare.domain.configuration.props.EmailProperties;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.healthcare.domain.model.entity.Appointment;
import com.healthcare.domain.model.entity.Patient;

@RequiredArgsConstructor
@Component
public class MailService {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    private final EmailProperties emailProps;

//    @Value("${email.username}")
//    private String email;

    public void sendMail(String sendTo, String subject, Appointment appointment) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        Context context = new Context();
        context.setVariable("medic", appointment.getMedic());
        context.setVariable("patient", appointment.getPatient());
        context.setVariable("appointment", appointment);
        context.setVariable("status", appointment.getStatus().toString());
        helper.setFrom(emailProps.getUsername());
        helper.setTo(sendTo);
        helper.setSubject(subject);
        String content = templateEngine.process("mailTemplate", context);
        helper.setText(content, true);
        javaMailSender.send(message);
    }

    public void sendMailRegister(String sendTo, String subject, Patient patient) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        Context context = new Context();
        context.setVariable("patient", patient);
        context.setVariable("user", patient.getUser());
        context.setVariable("date", formatLocalDate());
        context.setVariable("age", getAge(patient));
        helper.setFrom(emailProps.getUsername());
        helper.setTo(sendTo);
        helper.setSubject(subject);
        String content = templateEngine.process("registerTemplate", context);
        helper.setText(content, true);
        javaMailSender.send(message);
    }

    private String formatLocalDate(){
        var actualDate = LocalDate.now();
        DateTimeFormatter dFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        return dFormatter.format(actualDate);
    }
    private String getAge(Patient patient){
        var birthDate = patient.getBirthDate();
        return String.valueOf(LocalDate.now().compareTo(birthDate));
    }
}
