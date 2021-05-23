package course.cinemize.controller;



import course.cinemize.models.Hall;
import course.cinemize.models.Place;
import course.cinemize.models.Session;
import course.cinemize.models.UserModel;
import course.cinemize.repo.HallRepo;
import course.cinemize.repo.PlaceRepo;
import course.cinemize.repo.SessionRepo;
import course.cinemize.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.nio.charset.Charset;
import java.security.Principal;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000" )
@RestController
@RequestMapping("film")
public class NewController {
    @Autowired
    private HallRepo hallRepo;
    @Autowired
    private SessionRepo sessionRepo;
    @Autowired
    private PlaceRepo placeRepo;

    private int counter = 4;
    private List<Map<String,String>> films = new ArrayList<Map<String,String>>(){{
        add(new HashMap<String,String>(){{put("id", "1"); put("text","First film");}});
        add(new HashMap<String,String>(){{put("id", "2"); put("text","Second film");}});
        add(new HashMap<String,String>(){{put("id", "3"); put("text","Third film");}});
    }};
    @GetMapping("addhall")
    public List<Hall> addHall(){
//        ArrayList<Place> placeList = new ArrayList<Place>();
//        ArrayList<Hall> hallList = new ArrayList<>();
//        for(int i = 0;i<5;i++){
//            for(int j = 0;j<5;j++){
//                placeList.add(new Place(i,j,true));
//            }
//        }
//        hallRepo.save(new Hall(placeList, 3,true));
        return hallRepo.findAll();
    }

    @GetMapping("user")
    public Principal getAuthUser(Principal user, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Credentials", "true");

        return user;
    }

    @GetMapping
    public List<Map<String,String>> list(HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Credentials", "true");
        return films;
    }
    @GetMapping("{id}")
    public Map<String,String> getOne(@PathVariable String id,HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Credentials", "true");
        return getFilm(id);
    }

    private Map<String, String> getFilm(String id) {
        return films.stream()
                .filter(film -> film.get("id").equals(id))
                .findFirst()
                .orElseThrow();
    }

    @PostMapping
    public Map<String,String> create(@RequestBody Map<String,String> film){
        film.put("id",String.valueOf(counter++));
        films.add(film);
        return film;
    }
    @PutMapping("{id}")
    public Map<String,String> update(@PathVariable String id, @RequestBody Map<String,String> film){
        Map<String, String> filmFromDB = getFilm(id);
        filmFromDB.putAll(film);
        filmFromDB.put("id", id);
        return filmFromDB;
    }
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id){
        Map<String, String> film = getFilm(id);
        films.remove(film);
    }
}
