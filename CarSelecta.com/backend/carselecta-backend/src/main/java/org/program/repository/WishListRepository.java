package org.program.repository;

import java.util.List;

import org.program.entity.NewCar;
import org.program.entity.User;
import org.program.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface WishListRepository extends JpaRepository<WishList, Integer> {

	List<WishList> findByUser_UserIdAndNewCarIsNotNull(int userId);

	@Transactional
	@Modifying
	@Query("DELETE FROM WishList w WHERE w.newCar.newCarId = ?1 AND w.user.userId = ?2")
	void deleteWishListByNewCarIdAndUserId(int newCarId, int userId);
}
