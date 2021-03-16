package course.cinemize.controller;


import course.cinemize.exceptions.NotFoundException;
import course.cinemize.models.UserModel;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000" )
@RestController
@RequestMapping("film")
public class NewController {
    private int counter = 4;
    private List<Map<String,String>> films = new ArrayList<Map<String,String>>(){{
        add(new HashMap<String,String>(){{put("id", "1"); put("text","First film");}});
        add(new HashMap<String,String>(){{put("id", "2"); put("text","Second film");}});
        add(new HashMap<String,String>(){{put("id", "3"); put("text","Third film");}});
    }};
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
                .orElseThrow(NotFoundException::new);
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
