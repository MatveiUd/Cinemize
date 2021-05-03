package course.cinemize.controller;

import course.cinemize.models.Role;
import course.cinemize.models.UserModel;
import course.cinemize.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.Collections;

@RestController
public class LoginController {
    @Autowired
    private UserRepository userRepository;
    @GetMapping("/api/login")
    public Principal successAuth(Principal user){
        if(user != null){
            return user;
        }
        return null;
    }
    @PostMapping("/registration")
    public ResponseEntity<String> addUser(@RequestParam(value = "username") String username,
                                          @RequestParam(value = "password") String password) {

        UserModel user = userRepository.findUserByUsername(username);
        if(user != null){
            return ResponseEntity.badRequest().body("User exists");
        }

        user = new UserModel(username, BCrypt.hashpw(password,BCrypt.gensalt()));
        user.setRoles(Collections.singleton(Role.ADMIN));
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}

