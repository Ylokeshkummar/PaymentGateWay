package com.Project.PaymentGateway.Service;

import com.Project.PaymentGateway.Model.Transactions;
import com.Project.PaymentGateway.Repository.TransactionsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@Service
public class PaymentsService {

    @Autowired
    TransactionsRepo transactionsRepo;

    public ArrayList<Transactions> GetTransactionsByid(int transactionto) {
        ArrayList<Transactions> transactions = transactionsRepo.findByTransactionToOrderByTransactionDateDesc(transactionto);
        return transactions;
    }
    public ArrayList<Transactions> GetAllTransactions(int transactionto,String from,String to) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate fromDate = LocalDate.parse(from, formatter);
        LocalDate toDate   = LocalDate.parse(to, formatter);

// Normalize to start and end of day
        LocalDateTime fromDateTime = fromDate.atStartOfDay();
        LocalDateTime toDateTime   = toDate.atTime(23, 59, 59);
        ArrayList<Transactions> transactions=transactionsRepo.findByTransactionToAndTransactionDateBetween(transactionto,fromDateTime,toDateTime);
        return transactions;
    }

    public ArrayList<Transactions> GetTransDetailsByID(int id) {
        ArrayList<Transactions> transactions=  transactionsRepo.findByTransactionId(id);
        return  transactions;
    }
}
