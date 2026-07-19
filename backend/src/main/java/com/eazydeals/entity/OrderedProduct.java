package com.eazydeals.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ordered_product")
public class OrderedProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer oid;
    private String name;
    private Integer quantity;
    private String price;
    private String image;
    
    @ManyToOne
    @JoinColumn(name = "orderid")
    private Order order;
}
