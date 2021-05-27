package course.cinemize.repo;

import course.cinemize.models.Film;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmRepo extends JpaRepository<Film,Long> {
    Film findByTitle(String title);
}
