package com.healthcare.infrastructure.security.service;

import com.healthcare.domain.model.entity.User;
import com.healthcare.domain.model.enums.Role;
import com.healthcare.domain.repository.UserRepository;
import com.healthcare.infrastructure.dto.request.RequestLoginDTO;
import com.healthcare.infrastructure.dto.request.UserAuthenticated;
import com.healthcare.infrastructure.security.utils.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private JwtUtils jwtUtils;
    @Mock
    private BCryptPasswordEncoder passwordEncoder;
    @InjectMocks
    private AuthService authService;

    RequestLoginDTO login;

    @BeforeEach
    void setUp() {
        login = new RequestLoginDTO("john@foo.com", "12345");
    }

    @DisplayName("Test de login")
    @Test
    void loginUser() {
        var user = new User(1L,"john@foo.com", passwordEncoder.encode("12345"), Role.ADMIN, null, null, null);
        var userAuth = new UserAuthenticated(user);
        var passwordMatches = passwordEncoder.matches("12345", user.getPassword());

        when(userRepository.findByEmail("john@foo.com")).thenReturn(Optional.of(user));

        // not existing user
        when(userRepository.findById(2L)).thenReturn(Optional.empty());
        Optional<User> result = userRepository.findById(2L);

        //verify if they where called and not
        verify(userRepository, times(1)).findById(2L);
        verify(userRepository, never()).findById(1L);

        //assertion for userId = 2
        assertFalse(result.isPresent());

        var response = authService.loginUser(login);
        if(passwordMatches){
            when(jwtUtils.createToken(userAuth)).thenReturn("jwt");
            assertNotNull(response.getBody());
            assertEquals("jwt", response.getBody().token());
        }
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }
}