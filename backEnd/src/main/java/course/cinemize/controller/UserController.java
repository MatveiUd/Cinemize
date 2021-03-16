package course.cinemize.controller;


import course.cinemize.models.UserModel;
import course.cinemize.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

import java.security.Principal;

@RestController
@RequestMapping("user")
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    UserRepository userRepository;
    @GetMapping
    public UserModel getUser(Principal user, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Credentials", "true");
        if(user != null){
            return userRepository.findUserByUsername(user.getName());
        }
        return null;

    }
}
