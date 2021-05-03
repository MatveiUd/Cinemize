package course.cinemize.repo;

import course.cinemize.models.Frame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FrameRepo extends JpaRepository<Frame,Long> {
}
