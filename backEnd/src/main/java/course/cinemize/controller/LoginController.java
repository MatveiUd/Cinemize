package course.cinemize.controller;

import course.cinemize.models.BonusCard;
import course.cinemize.models.Role;
import course.cinemize.models.UserModel;
import course.cinemize.repo.BonusCardRepo;
import course.cinemize.repo.UserRepository;
import course.cinemize.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.nio.charset.Charset;
import java.security.Principal;
import java.util.Collections;
import java.util.Optional;
import java.util.Random;

@RestController
public class LoginController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MailService mailService;
    @Autowired
    private BonusCardRepo bonusCardRepo;
    @GetMapping("/api/login")
    public Principal successAuth(Principal user){
        if(user != null){
            return user;
        }
        return null;
    }
    @PostMapping("/registration")
    public ResponseEntity<String> addUser(@RequestParam(value = "email") String email,
                                          @RequestParam(value = "name") String name,
                                          @RequestParam(value = "birthdate")String birthdate,
                                          @RequestParam(value = "phonenumber") String phoneNumber) {

        UserModel user = userRepository.findUserByUsername(email);
        if(user != null){
            return ResponseEntity.badRequest().body("User exists");
        }
        String password = passwordGenerator();
        String bonusCardNumber = cardNumberGenerator();
        String message = String.format("Привет " + name + "!\n" + "Данные для входа в систему\nЛогин: " + email + "\nПароль: " + password );
        mailService.send(email,"Благодрим за регистрацию",message);

        user = new UserModel(name,birthdate,phoneNumber,email,bonusCardNumber ,BCrypt.hashpw(password,BCrypt.gensalt()),0);
        user.setRoles(Collections.singleton(Role.ADMIN));
        userRepository.save(user);

        BonusCard bonusCard = new BonusCard(bonusCardNumber,0);
        bonusCardRepo.save(bonusCard);
        return ResponseEntity.ok().build();
    }
    public String cardNumberGenerator(){
        String number = "";
        for(int i = 0; i<6;i++){
            if(i<3){
                int ascii = (int)(65 + Math.random()*25);

                number += ((char)ascii);
            } else {

                int ascii = (int)(48 + Math.random()*9);

                number += (char) ascii;
            }
        }
        BonusCard bonusCard = bonusCardRepo.findByNumber(number);
        if(bonusCard != null){
            cardNumberGenerator();
        }

        return number;
    }
    public String passwordGenerator(){
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 8;
        Random random = new Random();
        String password = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        return password;
    }
}

