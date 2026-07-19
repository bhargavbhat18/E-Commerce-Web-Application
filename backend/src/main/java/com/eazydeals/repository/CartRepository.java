package com.eazydeals.repository;

import com.eazydeals.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByUserUserid(Integer userId);
    Optional<Cart> findByUserUseridAndProductPid(Integer userId, Integer productId);
    void deleteByUserUserid(Integer userId);
}
