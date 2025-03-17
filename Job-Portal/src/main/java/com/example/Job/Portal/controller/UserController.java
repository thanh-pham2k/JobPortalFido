package com.example.Job.Portal.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Job.Portal.entity.User;
import com.example.Job.Portal.repository.UserRepository;
import com.example.Job.Portal.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class UserController {

    private UserService userService;
    private UserRepository userRepository;

    // @GetMapping("/users/search")
    // public ResponseEntity<List<User>> searchUsers(
    // @RequestParam(required = false) String name,
    // @RequestParam(required = false) String email,
    // @RequestParam(required = false) String phone) {

    // Specification<User> spec =
    // Specification.where(UserSpecification.hasName(name))
    // .and(UserSpecification.hasEmail(email))
    // .and(UserSpecification.hasPhone(phone));

    // List<User> users = userRepository.findAll(spec);
    // return ResponseEntity.ok(users);
    // }

    /**
     * Get all users
     * 
     * @return List of users
     */
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * Get user by id
     * 
     * @param id User id
     * @return User
     */
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    /**
     * Add new user
     * 
     * @param user User to be added
     * @return Added user
     */
    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    /**
     * Update user by id
     * 
     * @param id   User id
     * @param user User to be updated
     * @return Updated user
     */
    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    /**
     * Delete user by id
     * 
     * @param id User id
     */
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
