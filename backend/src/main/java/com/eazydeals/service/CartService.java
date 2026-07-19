package com.eazydeals.service;

import com.eazydeals.entity.Cart;
import com.eazydeals.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final com.eazydeals.repository.ProductRepository productRepository;
    private final com.eazydeals.repository.UserRepository userRepository;

    public com.eazydeals.dto.CartSummaryDto getCartSummary(Integer userId) {
        List<Cart> items = cartRepository.findByUserUserid(userId);
        return calculateTotals(items);
    }
    
    public com.eazydeals.dto.CartSummaryDto addToCart(Integer userId, Integer productId, Integer quantity) {
        Optional<Cart> existingCart = cartRepository.findByUserUseridAndProductPid(userId, productId);
        
        if (existingCart.isPresent()) {
            Cart cart = existingCart.get();
            cart.setQuantity(cart.getQuantity() + quantity);
            cartRepository.save(cart);
        } else {
            Cart cart = new Cart();
            cart.setUser(userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found")));
            cart.setProduct(productRepository.findById(productId).orElseThrow(() -> new IllegalArgumentException("Product not found")));
            cart.setQuantity(quantity);
            cartRepository.save(cart);
        }
        return getCartSummary(userId);
    }
    
    public com.eazydeals.dto.CartSummaryDto updateQuantity(Integer userId, Integer cartId, Integer quantity) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new IllegalArgumentException("Cart item not found"));
        if (!cart.getUser().getUserid().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized");
        }
        if (quantity <= 0) {
            cartRepository.delete(cart);
        } else {
            cart.setQuantity(quantity);
            cartRepository.save(cart);
        }
        return getCartSummary(userId);
    }
    
    public com.eazydeals.dto.CartSummaryDto removeFromCart(Integer userId, Integer cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new IllegalArgumentException("Cart item not found"));
        if (!cart.getUser().getUserid().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized");
        }
        cartRepository.delete(cart);
        return getCartSummary(userId);
    }
    
    @org.springframework.transaction.annotation.Transactional
    public void clearCart(Integer userId) {
        cartRepository.deleteByUserUserid(userId);
    }

    private com.eazydeals.dto.CartSummaryDto calculateTotals(List<Cart> items) {
        double subtotal = 0;
        for (Cart item : items) {
            double price = 0;
            try {
                price = Double.parseDouble(item.getProduct().getPrice());
            } catch (NumberFormatException e) {
                // Ignore parsing errors
            }
            subtotal += price * item.getQuantity();
        }
        
        double discount = subtotal * 0.10; // 10% discount for demo
        double tax = (subtotal - discount) * 0.18; // 18% tax
        double total = subtotal - discount + tax;
        
        com.eazydeals.dto.CartSummaryDto summary = new com.eazydeals.dto.CartSummaryDto();
        summary.setItems(items);
        summary.setSubtotal(subtotal);
        summary.setDiscount(discount);
        summary.setTax(tax);
        summary.setTotal(total);
        
        return summary;
    }
}
