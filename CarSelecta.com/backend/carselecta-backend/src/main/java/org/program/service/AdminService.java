package org.program.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.program.entity.Admin;
import org.program.entity.NewCar;
import org.program.repository.AdminRepository;
import org.program.repository.NewCarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AdminService {

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private NewCarRepository carRepository;

	public int adminLoginVerification(Admin admin) {
		Admin admin1 = adminRepository.findByUsernameAndPassword(admin.getUsername(), admin.getPassword());
		if (admin1 == null) {
			return 500;
		}
		return 200;
	}



}
