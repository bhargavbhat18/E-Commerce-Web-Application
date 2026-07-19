package com.eazydeals.config;

import com.eazydeals.entity.Category;
import com.eazydeals.entity.Product;
import com.eazydeals.entity.User;
import com.eazydeals.repository.CategoryRepository;
import com.eazydeals.repository.ProductRepository;
import com.eazydeals.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedCategoriesAndProducts();
    }

    private void seedUsers() {
        if (userRepository.findByEmail("admin@eazydeals.com").isEmpty()) {
            User admin = User.builder()
                    .name("Admin")
                    .email("admin@eazydeals.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .role("ROLE_ADMIN")
                    .build();
            userRepository.save(admin);
        }

        if (userRepository.findByEmail("user@eazydeals.com").isEmpty()) {
            User user = User.builder()
                    .name("Normal User")
                    .email("user@eazydeals.com")
                    .password(passwordEncoder.encode("User@123"))
                    .role("ROLE_USER")
                    .build();
            userRepository.save(user);
        }
    }

    private void seedCategoriesAndProducts() {
        if (categoryRepository.count() == 0) {
            String[] catNames = {"Electronics", "Fashion", "Grocery", "Home", "Books", "Sports"};
            List<Category> categories = new ArrayList<>();
            for (String name : catNames) {
                Category cat = new Category();
                cat.setName(name);
                categories.add(categoryRepository.save(cat));
            }

            if (productRepository.count() == 0) {
                List<Product> products = new ArrayList<>();
                // Generate 50 realistic products
                for (int i = 1; i <= 50; i++) {
                    Product p = new Product();
                    p.setName("Product " + i);
                    p.setDescription("Description for Product " + i + ". This is a highly recommended product.");
                    int calculatedPrice = (i * 100) + 99;
                    p.setPrice(String.valueOf(calculatedPrice));
                    p.setDiscount(i % 10);
                    p.setQuantity(100 - i);
                    Category cat = categories.get(i % categories.size());
                    p.setCategory(cat);
                    p.setImage("https://placehold.co/400x400/png?text=" + cat.getName().substring(0, 1) + i);
                    products.add(p);
                }
                productRepository.saveAll(products);
            }
        }
    }
}
