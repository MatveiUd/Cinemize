package course.cinemize.models;

import javax.persistence.*;
import java.util.Date;
import course.cinemize.models.Film;

@Entity
@Table(name = "session")
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long date;
    @ManyToOne
    @JoinColumn(name = "film_id")
    private Film film;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "hall_id")
    private Hall hall;
    private Integer cost;

    public Session() {
    }

    public Session(Long date, Film film, Hall hall, Integer cost) {
        this.date = date;
        this.film = film;
        this.hall = hall;
        this.cost = cost;
    }

    public Long getDate() {
        return date;
    }

    public void setDate(Long date) {
        this.date = date;
    }

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }

    public Hall getHall() {
        return hall;
    }

    public void setHall(Hall hall) {
        this.hall = hall;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
