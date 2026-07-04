package com.Project.PaymentGateway.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)   // auto-increment if DB supports it
    @Column(name = "transaction_id")                     // map to DB column
    private int transactionId;

    @Column(name = "tansaction_amount")                  // typo in DB column name
    private Long transactionAmount;

    private Date transactionDate;
    private String transactionType;
    private String transactionDescription;
    private String transactionStatus;
    private String transactionbyName;
    private String transactionbyPhone;
    private String transactionbyEmail;
    private String transactionbyAddress;

    @Column(name = "transactionto")
    private int transactionTo;

    private String transactionfromid;
    private String UTR;
}

