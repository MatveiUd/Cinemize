package course.cinemize.models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToOne
    @JoinColumn(name = "session_id")
    private Session sessionId;
    private Long placeId;

    public Ticket() { }

    public Ticket(Session sessionId, Long placeId) {
        this.sessionId = sessionId;
        this.placeId = placeId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Session getSessionId() {
        return sessionId;
    }

    public void setSessionId(Session sessionId) {
        this.sessionId = sessionId;
    }

    public Long getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Long placeId) {
        this.placeId = placeId;
    }
}
