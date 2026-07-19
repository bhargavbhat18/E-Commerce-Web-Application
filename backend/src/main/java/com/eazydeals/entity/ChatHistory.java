package com.eazydeals.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "chat_history")
public class ChatHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private Integer userId; // Optional, null if guest
    private String sessionId; // For guest tracking
    private String messageRole; // user or assistant
    
    @Column(length = 2000)
    private String messageContent;
    
    private Timestamp timestamp;
}
