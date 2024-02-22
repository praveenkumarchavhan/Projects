package org.program.controller;

import org.program.entity.User;
import org.program.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/user-signup")
	public void userSignup(@RequestBody User user) {
		
		userService.userSignupService(user);
	}
	@PostMapping("/user-login")
	public int userLogin(@RequestBody User user) {
		return userService.userLoginService(user);
	}
	@PostMapping("/user-forgot-password")
	public int userForgotPassword(@RequestBody User user) {
		return userService.userForgotPassword(user);
	}
	
	@GetMapping("/get-user-details")
	public User getUserDetails(@RequestParam String email) {
		return userService.getUserDetailsService(email);
	}
	
	@PostMapping("/update-user-details")
	public void updateUserDetails(@RequestBody User user) {
		userService.updateUserDetailsService(user);
	}
	@GetMapping("/add-user-address")
	public void addUserAddress(@RequestParam String address, String email) {
		userService.addUserAddressService(address, email);
	}

}
