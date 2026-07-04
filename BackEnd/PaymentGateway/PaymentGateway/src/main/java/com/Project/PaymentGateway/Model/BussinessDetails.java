package com.Project.PaymentGateway.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BussinessDetails {

    @Id
    private int bussinessId;

    private String bussinessName;
    private String ownerName;
    private String gstNumber;
    private String gstName;
    private String tradeName;
    private String Address;
    private String bankName;
    private String bankAccountType;
    private String bnkAccountNumber;
    private String ifscCode;
    private String apiKey;
    private String ipAddress;

    @UpdateTimestamp
    private Date updateDate;
    private Boolean paymentsEnabled;
}
