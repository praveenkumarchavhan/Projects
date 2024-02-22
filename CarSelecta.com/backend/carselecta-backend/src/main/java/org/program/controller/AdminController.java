package org.program.controller;

import java.io.IOException;
import java.util.List;

import org.program.entity.Admin;
import org.program.entity.NewCar;
import org.program.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/admin-login")
	public int adminLogin(@RequestBody Admin admin) {
		return adminService.adminLoginVerification(admin);
	}
	
	
}
