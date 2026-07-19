package com.eazydeals.dto;

import lombok.Data;

@Data
public class ChatRequestDto {
    private String message;
    private Integer userId;
    private String sessionId;
}
