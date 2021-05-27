package course.cinemize.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "hall")
public class Hall {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //зал 5x5
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "hall_id")
    private List<Place> places;
    private Integer number;
    private Boolean isFree;

    public Hall(){}

    public Hall(List<Place> places, Integer number, Boolean isFree) {
        this.places = places;
        this.number = number;
        this.isFree = isFree;
    }

    public List<Place> getPlaces() {
        return places;
    }

    public void setPlaces(List<Place> places) {
        this.places = places;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Boolean getFree() {
        return isFree;
    }

    public void setFree(Boolean free) {
        isFree = free;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
