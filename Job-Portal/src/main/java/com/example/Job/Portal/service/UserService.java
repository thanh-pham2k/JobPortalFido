package com.example.Job.Portal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Job.Portal.entity.Profile;
import com.example.Job.Portal.entity.User;
import com.example.Job.Portal.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User user) {
        User existingUser = getUserById(id);
        if (existingUser != null) {
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setResume(user.getResume());

            Profile existingProfile = existingUser.getProfile();
            if (existingProfile != null) {
                existingProfile.setBio(user.getProfile().getBio());
                existingProfile.setAvatarUrl(user.getProfile().getAvatarUrl());
                existingProfile.setLinkedin(user.getProfile().getLinkedin());
                existingProfile.setGithub(user.getProfile().getGithub());
                existingProfile.setSkills(user.getProfile().getSkills());
            }

            return userRepository.save(existingUser);
        }
        return null;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

}
