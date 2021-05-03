package course.cinemize.services;

import course.cinemize.models.UserModel;
import course.cinemize.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel user = userRepository.findUserByUsername(username);
        if (user == null){
            throw new UsernameNotFoundException("User not found");
        }
        UserDetails userDetails = User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRoles().toString())
                .build();

        return userDetails;
    }
}
