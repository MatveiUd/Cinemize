package course.cinemize.controller;

import course.cinemize.models.Film;
import course.cinemize.models.Hall;
import course.cinemize.models.Place;
import course.cinemize.models.Session;
import course.cinemize.repo.FilmRepo;
import course.cinemize.repo.HallRepo;
import course.cinemize.repo.SessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.h2.H2ConsoleAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/session")
public class SessionController {
    @Autowired
    private SessionRepo sessionRepo;
    @Autowired
    private FilmRepo filmRepo;
    @Autowired
    private HallRepo hallRepo;

    @GetMapping
    public List<Session> sessionList(){
        return sessionRepo.findAll();
    }
    @GetMapping("{session}")
    public Session getSession(@PathVariable Session session){
       return session;
    }
    @GetMapping("/add")
    public Map<String,List> filmAndHall(){
        Map<String,List> sessionData = new HashMap<>();

        sessionData.put("films",filmRepo.findAll());
        sessionData.put("halls",hallRepo.findAll());
        return sessionData;
    }
    @PostMapping("/add")
    public ResponseEntity<String> addSession(@RequestParam String filmTitle,
                                             @RequestParam Integer hallNumber,
                                             @RequestParam Long date,
                                             @RequestParam Integer cost){

        ArrayList<Place> places = new ArrayList<>();
        for(int i = 0;i<5;i++){
            for(int j = 0; j < 5;j++){
                places.add(new Place(i+1,j+1,true));
            }
        }
        Hall hall = new Hall(places,hallNumber,true);
        Session session = new Session(date,filmRepo.findByTitle(filmTitle),hall,cost);
        sessionRepo.save(session);
        return ResponseEntity.ok().build();
    }
}
