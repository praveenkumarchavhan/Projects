package org.program.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Admin {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "admin_id")
	private int adminId;
	private String username;
	private String password;
	
	@JsonIgnore
	@OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
	private List<NewCar> cars;

	@JsonIgnore
	@OneToMany(mappedBy = "admin")
	private List<CarPricing> carPricings;

	public int getAdminId() {
		return adminId;
	}

	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<NewCar> getCars() {
		return cars;
	}

	public void setCars(List<NewCar> cars) {
		this.cars = cars;
	}

	public List<CarPricing> getCarPricing() {
		return carPricings;
	}

	public void setCarPricing(List<CarPricing> carPricing) {
		this.carPricings = carPricing;
	}

	
}
