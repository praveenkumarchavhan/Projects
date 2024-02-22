package org.program.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
@Entity
public class Rating {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ratingId;
	
	private int score;	
	
	@ManyToOne
	@JoinColumn(name = "new_car_id")
	private NewCar newCar;
	
	@ManyToOne
	@JoinColumn(name = "used_car_id")
	private UsedCar usedCar;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	public int getRatingId() {
		return ratingId;
	}

	public void setRatingId(int ratingId) {
		this.ratingId = ratingId;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	
	
}
