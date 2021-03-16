package course.cinemize.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@CrossOrigin("http://localhost:3000")
public class LoginController {
    @GetMapping(value = "/login")
    public ResponseEntity<?> checkUser() {
        return ResponseEntity.ok().build();
    }
}
