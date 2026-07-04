package com.Project.PaymentGateway.Controller;

import com.Project.PaymentGateway.Model.BussinessDetails;
import com.Project.PaymentGateway.Service.ManageBussinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ManageBussiness")
public class ManageBussinessController {
    @Autowired
    ManageBussinessService manageBussinessService;

    @RequestMapping("/saveBussinessDetails")
    public BussinessDetails saveBussinessDetails(@RequestBody BussinessDetails bussinessDetails) {

        return manageBussinessService.saveorupdateBussniessDetails(bussinessDetails);
    }

    @RequestMapping("/getDetails")
    public BussinessDetails getDetails(@RequestBody int getBussinessDetailsById) {
        return manageBussinessService.getBussinessDetailsById(getBussinessDetailsById);
    }

}
