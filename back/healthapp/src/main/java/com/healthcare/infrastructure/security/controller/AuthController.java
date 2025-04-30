package com.healthcare.infrastructure.security.controller;

import com.healthcare.infrastructure.dto.response.ResponseTokenDTO;
import com.healthcare.infrastructure.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.infrastructure.dto.request.RequestLoginDTO;

import jakarta.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ResponseTokenDTO> loggedIn(@RequestBody @Valid RequestLoginDTO login) {
        return authService.loginUser(login);
    }

}
