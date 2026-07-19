package com.eazydeals.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "wishlist")
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idwishlist;
    
    @ManyToOne
    @JoinColumn(name = "iduser")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "idproduct")
    private Product product;
}
