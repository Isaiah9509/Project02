package com.revature.services;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.revature.models.Purchase;

public class EmailService {

    private static String from;
    private static String pass;
    private static Session session;

   static {
        pass = System.getenv("supersecret561");
        from = System.getenv("ravenclawrevature@yahoo.com");
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.mail.yahoo.com");
        props.put("mail.smtp.port", "587");
        session = Session.getInstance(props, new javax.mail.Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, pass);
            }
        });
   }

    public EmailService() {
        // TODO document why this constructor is empty
    }

    public static void sendmail(Purchase p) throws MessagingException {

        String emailTo = p.getOwner().getEmail();
        System.out.println(emailTo);
        Message msg = new MimeMessage(session);
        InternetAddress from1 = null;
        try {
            from1 = new InternetAddress(from, false);
        } catch (AddressException e) {
            e.printStackTrace();
        }
        try {
            msg.setFrom(from1);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        try {
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(emailTo));
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        try {
            System.out.println(Arrays.toString(InternetAddress.parse(emailTo)));
        } catch (AddressException e) {
            e.printStackTrace();
        }
        try {
            msg.setSubject("Thanks for your ticket purchase");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        try {
            msg.setContent("You made a ticket purchase", "text/html");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        try {
            msg.setSentDate(new Date());
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        MimeBodyPart messageBodyPart = new MimeBodyPart();
        String message =
                "Name: " + p.getOwner().getFirst() + " " + p.getOwner().getLast() +
                "\nMovie: " + p.getTickets().get(0).getMovieTitle() +
                "\nPrice: " + p.getPrice(p) +
                "\nPurchase Date: " + p.getPurchaseDate();

            DataHandler messageDataHandler = new DataHandler(messageBodyPart, "text/plain; charset=\"UTF-8\"");
            msg.setDataHandler(messageDataHandler);
            messageBodyPart.setContent(message, "text/html");



        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);
        // MimeBodyPart attachPart = new MimeBodyPart();

        // attachPart.attachFile("/var/tmp/image19.png");
        // multipart.addBodyPart(attachPart);
        try {
            msg.setContent(multipart);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        try {
            Transport.send(msg);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}