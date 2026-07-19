package com.eazydeals.controller;

import com.eazydeals.entity.Cart;
import com.eazydeals.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.eazydeals.dto.CartSummaryDto;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    @Operation(summary = "Get cart for user")
    public ResponseEntity<CartSummaryDto> getCart(@PathVariable Integer userId) {
        return ResponseEntity.ok(cartService.getCartSummary(userId));
    }
    
    @PostMapping("/{userId}/add")
    @Operation(summary = "Add item to cart")
    public ResponseEntity<CartSummaryDto> addToCart(
            @PathVariable Integer userId, 
            @RequestParam Integer productId, 
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.addToCart(userId, productId, quantity));
    }
    
    @PutMapping("/{userId}/update/{cartId}")
    @Operation(summary = "Update item quantity")
    public ResponseEntity<CartSummaryDto> updateQuantity(
            @PathVariable Integer userId, 
            @PathVariable Integer cartId, 
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateQuantity(userId, cartId, quantity));
    }
    
    @DeleteMapping("/{userId}/remove/{cartId}")
    @Operation(summary = "Remove item from cart")
    public ResponseEntity<CartSummaryDto> removeFromCart(
            @PathVariable Integer userId, 
            @PathVariable Integer cartId) {
        return ResponseEntity.ok(cartService.removeFromCart(userId, cartId));
    }
    
    @DeleteMapping("/{userId}/clear")
    @Operation(summary = "Clear cart")
    public ResponseEntity<Void> clearCart(@PathVariable Integer userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }
}
