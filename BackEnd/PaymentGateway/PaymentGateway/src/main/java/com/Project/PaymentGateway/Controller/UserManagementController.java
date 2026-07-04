package com.Project.PaymentGateway.Controller;

import com.Project.PaymentGateway.Model.UserMaster;
import com.Project.PaymentGateway.Service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserManagementController {

    @Autowired
    UserManagementService userManagementService;

    @PostMapping("/signup")
    public String CreateAccount(@RequestBody UserMaster userMaster){
       int Message= userManagementService.CreateAccount(userMaster);
       if(Message==0){
           return "ErrorUpdating Data";
       }else{
           return "{status: Success}";
       }
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> Login(@RequestBody UserMaster userMaster){
//        UserMaster user =userManagementService.LoginCheck(userMaster);
//        if(user==null){
//            return ResponseEntity.status(401).body("Invalid email or password");
//        }
//        return ResponseEntity.ok(Map.of( "token", "dummy-jwt-token", "user", Map.of( "email", user.getEmail(), "firstName", user.getFirstName() ) ));
//
//    }
@PostMapping("/login")
public UserMaster Login(@RequestBody UserMaster userMaster){
    UserMaster user =userManagementService.LoginCheck(userMaster);

    return user;

}
}
