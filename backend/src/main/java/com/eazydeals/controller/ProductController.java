package com.eazydeals.controller;

import com.eazydeals.entity.Product;
import com.eazydeals.service.AiReviewService;
import com.eazydeals.service.AiSearchService;
import com.eazydeals.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;
    private final AiSearchService aiSearchService;
    private final AiReviewService aiReviewService;

    @GetMapping
    @Operation(summary = "Get all products")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public Product getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    @GetMapping("/ai-search")
    @Operation(summary = "Search products using Natural Language")
    public String aiSearch(@RequestParam String query) {
        // Here we just return the AI-generated structured JSON
        // In a full implementation, we would parse this JSON and call JPA criteria
        return aiSearchService.convertNaturalLanguageToFilters(query);
    }

    @GetMapping("/{id}/review-summary")
    @Operation(summary = "Get AI Review Summary for a product")
    public String getReviewSummary(@PathVariable Integer id) {
        return aiReviewService.summarizeReviews(id);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new product (Admin only)")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.createProduct(product));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing product (Admin only)")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a product (Admin only)")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}
