package com.eazydeals.repository;

import com.eazydeals.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
    List<Wishlist> findByUserUserid(Integer userId);
    Optional<Wishlist> findByUserUseridAndProductPid(Integer userId, Integer productId);
}
