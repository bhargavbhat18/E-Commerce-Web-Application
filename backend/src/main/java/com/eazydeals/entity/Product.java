package com.eazydeals.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pid;
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    private String price; // keeping string as in original schema, though double is better
    private Integer quantity;
    private Integer discount;
    private String image;
    
    @ManyToOne
    @JoinColumn(name = "cid")
    private Category category;
}
