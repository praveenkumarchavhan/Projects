package org.program.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class UsedCar {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "used_car_id")
	private int usedCarId;
	@Lob
	private byte[] image;
	private String carName;
	private String carBrand;
	private String carType;
	private double carPrice;
	private String mileage;
	private String fuelType;
	private String transmission;
	private String Year;
	
	@Column(length = 2000)
	private String description;
	
	@OneToMany(mappedBy = "usedCar")
	private List<WishList> wishLists;
	
	@OneToMany(mappedBy = "usedCar")
    private List<Rating> ratings;
	
	@OneToMany(mappedBy = "usedCar")
	private List<Review> reviews;
	
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;


	public int getUsedCarId() {
		return usedCarId;
	}


	public void setUsedCarId(int usedCarId) {
		this.usedCarId = usedCarId;
	}


	public byte[] getImage() {
		return image;
	}


	public void setImage(byte[] image) {
		this.image = image;
	}


	public String getCarName() {
		return carName;
	}


	public void setCarName(String carName) {
		this.carName = carName;
	}


	public String getCarBrand() {
		return carBrand;
	}


	public void setCarBrand(String carBrand) {
		this.carBrand = carBrand;
	}


	public String getCarType() {
		return carType;
	}


	public void setCarType(String carType) {
		this.carType = carType;
	}


	public double getCarPrice() {
		return carPrice;
	}


	public void setCarPrice(double carPrice) {
		this.carPrice = carPrice;
	}


	public String getMileage() {
		return mileage;
	}


	public void setMileage(String mileage) {
		this.mileage = mileage;
	}


	public String getFuelType() {
		return fuelType;
	}


	public void setFuelType(String fuelType) {
		this.fuelType = fuelType;
	}


	public String getTransmission() {
		return transmission;
	}


	public void setTransmission(String transmission) {
		this.transmission = transmission;
	}


	public String getYear() {
		return Year;
	}


	public void setYear(String year) {
		Year = year;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public List<WishList> getWishLists() {
		return wishLists;
	}


	public void setWishLists(List<WishList> wishLists) {
		this.wishLists = wishLists;
	}


	public List<Rating> getRatings() {
		return ratings;
	}


	public void setRatings(List<Rating> ratings) {
		this.ratings = ratings;
	}


	public List<Review> getReviews() {
		return reviews;
	}


	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}

	
	
	
}
