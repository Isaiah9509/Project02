package com.revature.services;

import java.io.IOException;
import java.util.Date;
import java.util.Properties;

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
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, pass);
            }
        });
    }

    public EmailService() {
    }

    public static void sendmail(Purchase p) throws AddressException, MessagingException, IOException {
        String emailto = p.getOwner().getEmail();
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(from, false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(emailto));
        msg.setSubject("Thanks for your ticket purchase");
        msg.setContent("You made a ticket purchase", "text/html");
        msg.setSentDate(new Date());

        MimeBodyPart messageBodyPart = new MimeBodyPart();
        String message =
                "Name: " + p.getOwner().getFirst() + " " + p.getOwner().getLast() +
                "\nMovie: " + p.getTickets().get(0).getMovieTitle() +
                "\nPrice: " + p.getPrice(p) +
                "\nPurchase Date: " + p.getPurchaseDate();
        messageBodyPart.setContent(message, "text/html");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);
        // MimeBodyPart attachPart = new MimeBodyPart();

        // attachPart.attachFile("/var/tmp/image19.png");
        // multipart.addBodyPart(attachPart);
        msg.setContent(multipart);
        Transport.send(msg);
    }
}