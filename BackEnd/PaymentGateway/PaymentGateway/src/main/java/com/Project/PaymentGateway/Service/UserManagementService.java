package com.Project.PaymentGateway.Service;

import com.Project.PaymentGateway.Model.UserMaster;
import com.Project.PaymentGateway.Repository.UserManagementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class UserManagementService {

    @Autowired
    UserManagementRepo userManagementRepo;

    public Integer CreateAccount(UserMaster userMaster) {
        userManagementRepo.save(userMaster);
        return 1;
    }

    public UserMaster LoginCheck(UserMaster userMaster) {
        UserMaster DBData= (UserMaster) userManagementRepo.findAllByEmail(userMaster.getEmail());
        if(DBData.getPassword().equals(userMaster.getPassword())){
            return DBData;
        }
        else{
            return null;
        }
    }
}
