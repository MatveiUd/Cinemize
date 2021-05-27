package course.cinemize.repo;

import course.cinemize.models.BonusCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BonusCardRepo extends JpaRepository<BonusCard,Long> {
    BonusCard findByNumber(String number);
}
