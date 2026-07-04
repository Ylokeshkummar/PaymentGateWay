package com.Project.PaymentGateway.Repository;

import com.Project.PaymentGateway.Model.Transactions;
import com.Project.PaymentGateway.Model.UserMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Repository
public interface TransactionsRepo extends JpaRepository<Transactions, Integer> {
    // Custom query method for your column
    ArrayList<Transactions> findByTransactionTo(int transactionTo);

    ArrayList<Transactions> findByTransactionToOrderByTransactionDateDesc(int transactionto);
    ArrayList<Transactions> findByTransactionId(int transactionId);
    ArrayList<Transactions> findByTransactionToAndTransactionDateBetween(
            Integer transactionTo,
            LocalDateTime fromDate,
            LocalDateTime toDate
    );

}

