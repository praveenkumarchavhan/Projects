package org.program.repository;

import java.util.List;

import org.program.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Integer> {

	List<Rating> findAllByNewCar_NewCarId(int newCarId); 
}
