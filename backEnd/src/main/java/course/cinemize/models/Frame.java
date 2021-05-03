package course.cinemize.models;

import javax.persistence.*;

@Entity
@Table(name = "frame")
public class Frame {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String imageUrl;
    private Boolean isCover;


    public Frame(){}
    public Frame(String imageUrl, Boolean isCover) {
        this.imageUrl = imageUrl;
        this.isCover = isCover;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getCover() {
        return isCover;
    }

    public void setCover(Boolean cover) {
        isCover = cover;
    }
}
