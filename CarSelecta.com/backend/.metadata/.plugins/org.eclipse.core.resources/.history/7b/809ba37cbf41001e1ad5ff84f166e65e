package org.program.repository;

import java.util.List;

import org.program.entity.NewCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NewCarRepository extends JpaRepository<NewCar, Integer>{
//	public List<NewCar>
	
	public List<NewCar> findByCarName(String carName);
	public List<NewCar> findByCarType(String carTpe);
	public List<NewCar> findByCarBrand(String carBrand);
	public List<NewCar> findByModelYear(String modelYear);
	
	List<NewCar> findAllByNewCarIdIn(List<Integer> carIds);
	
	public NewCar findByNewCarId(int newCarId);
	
	
	@Query("select c from NewCar c where c.carPrice between ?1 and ?2 and c.carType=?3")
	public List<NewCar> searchCarByPriceAndType(double minPrice, double maxPrice, String modelTyp);
	
}
