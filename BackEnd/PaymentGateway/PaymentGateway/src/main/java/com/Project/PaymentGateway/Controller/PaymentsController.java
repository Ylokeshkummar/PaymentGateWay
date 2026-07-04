package com.Project.PaymentGateway.Controller;

import com.Project.PaymentGateway.Model.Transactions;
import com.Project.PaymentGateway.Service.PaymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/Payments")
public class PaymentsController {

    @Autowired
    PaymentsService paymentsService;

    @RequestMapping("/fetchTransactions")
    public ArrayList<Transactions> GetTransactionsByid(@RequestBody int id){
        System.out.println(id);
        ArrayList<Transactions> transactions=paymentsService.GetTransactionsByid(id);
    return transactions;
    }

    @RequestMapping("/fetchTransactionsfilter")
    public ArrayList<Transactions> getTransactionsByIdFilter(
            @RequestParam int id,
            @RequestParam String start,
            @RequestParam String end) {
        System.out.println(id);
        System.out.println(start);
        System.out.println(end);

        return paymentsService.GetAllTransactions(id,start,end);
    }

    @RequestMapping("/GetTransDeatails")
    public ArrayList<Transactions> GetTransDeatailsByid(@RequestBody int id){
        return paymentsService.GetTransDetailsByID(id);
    }
}
