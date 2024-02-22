package org.program.controller;

import org.program.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ReviewController {
	
	@Autowired
	private ReviewService reviewService;
	
}
