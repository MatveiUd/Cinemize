package course.cinemize.controller;


import course.cinemize.models.Role;
import course.cinemize.models.UserModel;
import course.cinemize.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
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
    @GetMapping("{user}")
    public UserModel userEdit(@PathVariable UserModel user){
        return user;
    }
    @GetMapping("/all")
    public List<UserModel> getAllUsers(){
        return userRepository.findAll();
    }
    @PostMapping("/save")
    public ResponseEntity<String> saveChange(@RequestParam Boolean isAdmin, @RequestParam Boolean isUser,@RequestParam("userId") UserModel user){
            user.getRoles().clear();
            if(isAdmin){
                user.getRoles().add(Role.ADMIN);
            }
            if(isUser){
                user.getRoles().add(Role.USER);
            }
            userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
