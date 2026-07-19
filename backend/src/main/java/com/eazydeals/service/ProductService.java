package com.eazydeals.service;

import com.eazydeals.entity.Product;
import com.eazydeals.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Integer id) {
        return productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found"));
    }
    
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
    
    public Product updateProduct(Integer id, Product productDetails) {
        Product existing = getProductById(id);
        existing.setName(productDetails.getName());
        existing.setDescription(productDetails.getDescription());
        existing.setPrice(productDetails.getPrice());
        existing.setDiscount(productDetails.getDiscount());
        existing.setImage(productDetails.getImage());
        existing.setCategory(productDetails.getCategory());
        return productRepository.save(existing);
    }
    
    public void deleteProduct(Integer id) {
        Product existing = getProductById(id);
        productRepository.delete(existing);
    }
}
