package com.eazydeals.repository;

import com.eazydeals.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Integer> {
    List<ChatHistory> findBySessionIdOrderByTimestampAsc(String sessionId);
    List<ChatHistory> findByUserIdOrderByTimestampAsc(Integer userId);
}
