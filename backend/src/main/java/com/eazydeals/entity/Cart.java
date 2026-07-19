package com.eazydeals.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "pid")
    private Product product;
    
    private Integer quantity;
}
