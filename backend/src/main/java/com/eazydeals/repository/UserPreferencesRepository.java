package com.eazydeals.repository;

import com.eazydeals.entity.UserPreferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPreferencesRepository extends JpaRepository<UserPreferences, Integer> {
    Optional<UserPreferences> findByUserUserid(Integer userId);
}
