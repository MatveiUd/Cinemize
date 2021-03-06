package course.cinemize.models;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Film")
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String originTitle;
    private String description;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "film_id")
    private List<Genre> genre;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "film_id")
    private List<Country> country;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "film_id")
    private List<Director> director;
    private Long data;
    private String duration;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "frame_id")
    private List<Frame> frames;

    public Film() {
    }

    public Film(String title, String originTitle, String description, List<Genre> genre, List<Country> country, List<Director> director, Long data, String duration, List<Frame> frames) {
        this.title = title;
        this.originTitle = originTitle;
        this.description = description;
        this.genre = genre;
        this.country = country;
        this.director = director;
        this.data = data;
        this.duration = duration;
        this.frames = frames;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOriginTitle() {
        return originTitle;
    }

    public void setOriginTitle(String originTitle) {
        this.originTitle = originTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Genre> getGenre() {
        return genre;
    }

    public void setGenre(List<Genre> genre) {
        this.genre = genre;
    }

    public List<Country> getCountry() {
        return country;
    }

    public void setCountry(List<Country> country) {
        this.country = country;
    }

    public List<Director> getDirector() {
        return director;
    }

    public void setDirector(List<Director> director) {
        this.director = director;
    }

    public void setFrames(List<Frame> frames) {
        this.frames = frames;
    }

    public Long getData() {
        return data;
    }

    public void setData(Long data) {
        this.data = data;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public List<Frame> getFrames() {
        return frames;
    }

    public void setFrame(List<Frame> frames) {
        this.frames = frames;
    }

}
