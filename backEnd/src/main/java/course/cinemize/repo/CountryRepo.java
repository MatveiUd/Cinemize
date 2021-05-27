package course.cinemize.repo;

import course.cinemize.models.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepo extends JpaRepository<Country,Long> {
}
