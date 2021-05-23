package course.cinemize.repo;

import course.cinemize.models.Hall;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HallRepo extends JpaRepository<Hall,Long> {
    Hall findByNumber(Integer number);
}
