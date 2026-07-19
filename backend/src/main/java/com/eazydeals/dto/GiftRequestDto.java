package com.eazydeals.dto;

import lombok.Data;
import java.util.List;

@Data
public class GiftRequestDto {
    private Double budget;
    private Integer recipientAge;
    private String gender;
    private List<String> interests;
    private String occasion;
}
