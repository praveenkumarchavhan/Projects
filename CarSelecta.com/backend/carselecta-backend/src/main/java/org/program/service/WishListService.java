package org.program.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.program.entity.NewCar;
import org.program.entity.User;
import org.program.entity.WishList;
import org.program.repository.NewCarRepository;
import org.program.repository.UserRepository;
import org.program.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class WishListService {

	@Autowired
	private WishListRepository wishListRepository;

	@Autowired
	private NewCarRepository newCarRepository;

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public void addToWishListService(String email, int newCarId) {
		User user = userRepository.findByEmail(email);
		NewCar cars = newCarRepository.findByNewCarId(newCarId);
		WishList wishList = new WishList();
		wishList.setUser(user);
		wishList.setNewCar(cars);

		wishListRepository.save(wishList);
	}

	public Set<NewCar> getFavoriteCarsService(String email) {
		User user = userRepository.findByEmail(email);
		List<WishList> wishList = wishListRepository.findByUser_UserIdAndNewCarIsNotNull(user.getUserId());
		Set<NewCar> newCar = new HashSet<>();
		for (WishList wishlist2 : wishList) {
			newCar.add(wishlist2.getNewCar());
		}
		return newCar;
	}

	public void deleteFromWishlistService(int newCarId, String email) {

		User user = userRepository.findByEmail(email);
		wishListRepository.deleteWishListByNewCarIdAndUserId(newCarId, user.getUserId());
	}

	public int isCarFavoriteService(String email, int newCarId) {
		User user = userRepository.findByEmail(email);
		List<WishList> wishList = wishListRepository.findByUser_UserIdAndNewCarIsNotNull(user.getUserId());
		for (WishList wishlist2 : wishList) {
			NewCar newCar = wishlist2.getNewCar();
			if (newCar.getNewCarId() == newCarId) {
				return 200;
			}
		}
		return 500;
	}
}
