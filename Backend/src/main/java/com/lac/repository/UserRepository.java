package com.lac.repository;

import com.lac.model.User;
import com.lac.security.UserPrincipal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByUsernameOrEmail(String username, String email);
    User findByUserId(Long userId);
    User findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByUsernameOrEmail(String username, String email);
    Boolean editUsername(UserPrincipal userPrincipal, String name);
}
