package com.healthcare.domain.controller;

import com.healthcare.domain.dto.request.UserRequestUpdate;
import com.healthcare.domain.utils.Response;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import com.healthcare.domain.dto.response.UserResponse;
import com.healthcare.domain.service.interfaces.IUserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Map;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final IUserService userService;

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO','PACIENTE'})")
    @GetMapping
    public ResponseEntity<UserResponse> getUserDetails(@RequestParam String email) {
        var response = userService.getUser(email);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO','PACIENTE'})")
    @PutMapping("{id}")
    public ResponseEntity<Map<String, String>> editUser(@PathVariable Long id, @RequestBody @Valid UserRequestUpdate user) {
        userService.edit(id, user);
        return ResponseEntity.ok(Response.create("Usuario editado exitosamente"));
    }
}
