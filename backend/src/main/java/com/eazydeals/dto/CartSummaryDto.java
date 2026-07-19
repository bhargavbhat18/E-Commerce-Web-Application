package com.eazydeals.dto;

import com.eazydeals.entity.Cart;
import lombok.Data;

import java.util.List;

@Data
public class CartSummaryDto {
    private List<Cart> items;
    private double subtotal;
    private double discount;
    private double tax;
    private double total;
}
