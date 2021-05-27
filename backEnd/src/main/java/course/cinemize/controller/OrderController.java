package course.cinemize.controller;

import course.cinemize.models.*;
import course.cinemize.repo.*;
import course.cinemize.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    OrderRepo orderRepo;
    @Autowired
    PlaceRepo placeRepo;
    @Autowired
    SessionRepo sessionRepo;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BonusCardRepo bonusCardRepo;
    @Autowired
    MailService mailService;
    @GetMapping
    public List<Order> getOrders(){
        return orderRepo.findAll();
    }
    @PostMapping
    public ResponseEntity<String> addOrder(@RequestParam List<Long> placeId,
                                           @RequestParam int cost,
                                           @RequestParam int usedScore,
                                           @RequestParam String bonusCardNumber,
                                           @RequestParam Long sessionId,
                                           @RequestParam String email,
                                           Principal principalUser){

        UserModel user = null;
        if (principalUser != null) {
            user = userRepository.findUserByUsername(principalUser.getName());
        }

        Session session = sessionRepo.findById(sessionId).orElse(new Session());
        if(!bonusCardNumber.equals("")){
            double percent = 0;

            BonusCard bonusCard = bonusCardRepo.findByNumber(bonusCardNumber);
            if(bonusCard.getPurchaseAmount() > 500) percent = 0.02;
            if(bonusCard.getPurchaseAmount() > 1000) percent = 0.05;
            if(bonusCard.getPurchaseAmount() > 2000) percent = 0.07;
            if(bonusCard.getPurchaseAmount() > 3000) percent = 0.10;
            if(bonusCard.getPurchaseAmount() > 4000) percent = 0.15;
            if(bonusCard.getPurchaseAmount() > 5000) percent = 0.20;

            cost = cost - (int)((double)cost * percent);

        } else cost = cost - usedScore;




        ArrayList<Ticket> tickets = new ArrayList<Ticket>();
        for(int i =0;i<placeId.size();i++){
            tickets.add(new Ticket(session,placeId.get(i)));
        }
        Order order = new Order(tickets,cost,usedScore,bonusCardNumber,email);
        orderRepo.save(order);
        if(user != null){
            List<Order> userOrders =  user.getOrders();
            userOrders.add(order);
            user.setOrders(userOrders);
            userRepository.save(user);
        }

        return ResponseEntity.ok().build();
    }
    @PostMapping("/accept/{order}")
    public void changeStatus(@PathVariable Order order,Principal principalUser){

        UserModel user = userRepository.findUserByUsername(order.getUserEmail());

        int score = 0;

        if(!order.getBonusCardNumber().equals("")){
            BonusCard bonusCard =  bonusCardRepo.findByNumber(order.getBonusCardNumber());
            int amount = bonusCard.getPurchaseAmount();
            amount = amount + order.getCost();
            bonusCard.setPurchaseAmount(amount);
            bonusCardRepo.save(bonusCard);
        }
        if(user != null){
            if(order.getUsedScore() > 0){
                score = user.getScore() - order.getUsedScore();
            } else {
                score = (int) (order.getCost() * 0.07) + user.getScore();

            }
            user.setScore(score);
            userRepository.save(user);
        }

        ArrayList<Place> places = new ArrayList<>();
        for(int i = 0; i< order.getTickets().size();i++){
            Place place = placeRepo.findById(order.getTickets().get(i).getPlaceId()).orElse(new Place());
            place.setFree(false);
            placeRepo.save(place);
            places.add(place);
        }
        order.setPadFor(true);
        String message = "Благодарим за приобретение билета в нашем онлайн сервисе\n";
        if(places.size() == 1){
            message += String.format("Ваше место:\nРяд:" +
                            places.get(0).getRow() +
                    " место:" +
                    places.get(0).getNumber());
        }else {
            message += String.format("Ваши места:\n");
            for(int i = 0 ;i< places.size();i++){
                message += String.format("Ряд:" +
                        places.get(i).getRow() +
                        " место:" +
                        places.get(i).getNumber() + "\n");
            }
        }

        mailService.send(order.getUserEmail(),"Кассовый чек",message);
        orderRepo.save(order);
    }
}
