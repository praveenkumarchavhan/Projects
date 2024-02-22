package org.program.controller;

import org.program.service.EmailDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class EmailDataController {

	@Autowired
	private EmailDataService emailDataService;
	
	@Autowired
	private JavaMailSender emailSender;

	@GetMapping("/send-email")
	public void sendEmail() {
		  SimpleMailMessage message = new SimpleMailMessage();
		  message.setTo("cafeeuphoria2020@gmail.com");
		  message.setSubject("Email Testing");
		  message.setText("dsdsskncsj vsknvsjnvs vskvnsvjsnvjs vskvnsjsvnsvjs svnslvjsnvlsj");
		  emailSender.send(message);
	}
}
