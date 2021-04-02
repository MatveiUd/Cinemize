package course.cinemize.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.Arrays;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/")
public class MainController {
    @GetMapping
    public String main(Principal user, HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Credentials", "true");

        if(user != null){
           return user.getName();
       }

        return "null";
    }
}
