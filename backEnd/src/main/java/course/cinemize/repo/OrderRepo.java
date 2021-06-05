package course.cinemize.repo;

import course.cinemize.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order,Long> {
    List<Order> findAllByUserEmail(String email);
}
