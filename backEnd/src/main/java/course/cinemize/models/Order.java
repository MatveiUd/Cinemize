package course.cinemize.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private List<Ticket> tickets;
    private Integer cost;
    private Integer usedScore;
    private String bonusCardNumber;
    private Boolean paidFor;
    private String userEmail;
    public Order(){}

    public Order(List<Ticket> tickets, Integer cost, Integer usedScore, String bonusCardNumber,String userEmail) {
        this.tickets = tickets;
        this.cost = cost;
        this.usedScore = usedScore;
        this.bonusCardNumber = bonusCardNumber;
        this.userEmail = userEmail;
        this.paidFor = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Integer getUsedScore() {
        return usedScore;
    }

    public void setUsedScore(Integer usedScore) {
        this.usedScore = usedScore;
    }

    public String getBonusCardNumber() {
        return bonusCardNumber;
    }

    public void setBonusCardNumber(String bonusCardNumber) {
        this.bonusCardNumber = bonusCardNumber;
    }

    public Boolean getPadFor() {
        return paidFor;
    }

    public void setPadFor(Boolean padFor) {
        this.paidFor = padFor;
    }


    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
