package com.Project.PaymentGateway.Repository;

import com.Project.PaymentGateway.Model.BussinessDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManageBussinessRepo extends CrudRepository<BussinessDetails, Integer> {

}
