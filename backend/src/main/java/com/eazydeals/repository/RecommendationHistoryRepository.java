package com.eazydeals.repository;

import com.eazydeals.entity.RecommendationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationHistoryRepository extends JpaRepository<RecommendationHistory, Integer> {
    List<RecommendationHistory> findByUserUseridOrderByDateDesc(Integer userId);
}
