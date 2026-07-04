package com.Project.PaymentGateway.Repository;

import com.Project.PaymentGateway.Model.UserMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserManagementRepo extends JpaRepository<UserMaster,Integer> {

    Object findAllByEmail(String email);
}
