package course.cinemize.controller;

import course.cinemize.models.*;
import course.cinemize.repo.FilmRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/film")
public class FilmController {
    @Autowired
    private FilmRepo filmRepo;
    @GetMapping
    public List<Film> getFilmList(){
        List<Film> films = filmRepo.findAll();
        return  films;
    }


    @PostMapping("add")
    public void addFilm(@RequestParam String title,
                        @RequestParam String originTitle,
                        @RequestParam String description,
                        @RequestParam List<String> genre,
                        @RequestParam List<String> country,
                        @RequestParam List<String> director,
                        @RequestParam Long data,
                        @RequestParam String duration,
                        @RequestParam List<String> imagesUrl){
        ArrayList<Genre> genres = new ArrayList<>();
        for (int i = 0;i<genre.size();i++){
            genres.add(new Genre(genre.get(i)));
        }
        ArrayList<Country> countries = new ArrayList<>();
        for (int i = 0;i<country.size();i++){
            countries.add(new Country(country.get(i)));
        }
        ArrayList<Director> directors = new ArrayList<>();
        for (int i = 0;i<director.size();i++){
            directors.add(new Director(director.get(i)));
        }

        ArrayList<Frame> frames= new ArrayList<Frame>();
        for(int i= 0;i<imagesUrl.size();i++){
            if(i == 0 ){
                frames.add(new Frame(imagesUrl.get(i),true));
            } else {
                frames.add(new Frame(imagesUrl.get(i),false));
            }

        }
        filmRepo.save(new Film(title,originTitle,description,genres,countries,directors,data,duration,frames));
    }
}
