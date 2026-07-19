package com.eazydeals.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;
import java.util.List;

@Data
@Entity
@Table(name = "`order`") // Backticks because order is a reserved word
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String orderid;
    private String status;
    private String paymentType;
    
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    
    @Column(insertable = false, updatable = false)
    private Timestamp date;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderedProduct> orderedProducts;
}
