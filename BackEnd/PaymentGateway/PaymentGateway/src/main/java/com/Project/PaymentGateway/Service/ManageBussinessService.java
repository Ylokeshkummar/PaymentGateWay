package com.Project.PaymentGateway.Service;

import com.Project.PaymentGateway.Model.BussinessDetails;
import com.Project.PaymentGateway.Repository.ManageBussinessRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManageBussinessService {

    @Autowired
    ManageBussinessRepo manageBussinessRepo;

public BussinessDetails saveorupdateBussniessDetails(BussinessDetails bussinessDetails){
    BussinessDetails updated;
    updated=manageBussinessRepo.save(bussinessDetails);
    return updated;
}

    public BussinessDetails getBussinessDetailsById(int getBussinessDetailsById) {
    return manageBussinessRepo.findById(getBussinessDetailsById).get();
    }
}
