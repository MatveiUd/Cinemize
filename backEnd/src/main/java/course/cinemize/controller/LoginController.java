package course.cinemize.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class LoginController {
    @PostMapping("/api/login/error")
    public ResponseEntity<?> errorAuth(){

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    @GetMapping("/api/login/success")
    public String successAuth(Principal user){
        if(user != null){
            return user.getName();
        }

        return "null";
    }
    @PostMapping("/zalupa")
    public String los(){
        return "Post zapros proshol";
    }
}

