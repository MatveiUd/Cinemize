package course.cinemize.repo;

import course.cinemize.models.Director;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectorRepo extends JpaRepository<Director,Long> {
}
