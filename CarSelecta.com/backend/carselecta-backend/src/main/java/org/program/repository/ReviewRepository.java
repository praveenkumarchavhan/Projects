package org.program.repository;

import java.util.List;

import org.program.entity.Rating;
import org.program.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
	
	List<Review> findAllByNewCar_NewCarId(int newCarId);
	
}
