package course.cinemize.repo;

import course.cinemize.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel,Long> {
    UserModel findUserByUsername(String username);
}
