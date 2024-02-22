package org.program.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 2000)
	private String comment;
	
	@Column(length = 100)
	private String heading;
	
	private String dateOfReview;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "new_car_id")
	private NewCar newCar;
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "used_car_id")
	private UsedCar usedCar;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getComment() {
		return comment;
	}
	
	
	public String getHeading() {
		return heading;
	}

	public void setHeading(String heading) {
		this.heading = heading;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	
	public String getDateOfReview() {
		return dateOfReview;
	}

	public void setDateOfReview(String dateOfReview) {
		this.dateOfReview = dateOfReview;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public NewCar getNewCar() {
		return newCar;
	}

	public void setNewCar(NewCar newCar) {
		this.newCar = newCar;
	}

	public UsedCar getUsedCar() {
		return usedCar;
	}

	public void setUsedCar(UsedCar usedCar) {
		this.usedCar = usedCar;
	}

	@Override
	public String toString() {
		return "Review [id=" + id + ", comment=" + comment + ", heading=" + heading + ", dateOfReview=" + dateOfReview
				+ ", user=" + user + ", newCar=" + newCar + "]";
	}
	
	
	
}
