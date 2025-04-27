package com.healthcare.domain.service;

import com.healthcare.domain.dto.request.UserRequestUpdate;
import com.healthcare.domain.dto.response.UserResponse;
import com.healthcare.domain.exceptions.NotFoundInDatabaseException;
import com.healthcare.domain.model.entity.User;
import com.healthcare.domain.model.enums.Role;
import com.healthcare.domain.repository.UserRepository;
import com.healthcare.domain.service.interfaces.IUserService;
import com.healthcare.infrastructure.security.service.SecurityOwnership;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final SecurityOwnership securityOwnership;

    @Override
    public UserResponse getUser(String email) {
        var user = getUserByEmail(email);
        verifyEmailAndRole(user);
        return modelMapper.map(user, UserResponse.class);
    }

    @Transactional
    @Override
    public void edit(Long id, UserRequestUpdate userRequest) {
        var user = getUserById(id);
        verifyEmailAndRole(user);
        encodePassword(user, userRequest.getPassword());
        userRepository.save(user);
    }

    private void encodePassword(User u, String rawPassword) {
        u.setPassword(passwordEncoder.encode(rawPassword));
    }

    private User getUserById(Long id) {
        return getUser(id, null);
    }

    private User getUserByEmail(String email) {
        return getUser(null, email);
    }

    private User getUser(Long id, String email) {
        if(id == null){
            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new NotFoundInDatabaseException("El usuario no se encontró"));
        }
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundInDatabaseException("El usuario no se encontró"));
    }

    private String getEmailFromAuthentication() {
        return securityOwnership.getCredentials().getName();
    }

    private Role getRoleFromAuthentication() {
        String role = securityOwnership.getCredentials()
                .getPrincipal()
                .toString()
                .replaceAll(".*role=([^)]+)\\).*", "$1");
        switch (role) {
            case "ADMIN" -> {
                return Role.ADMIN;
            }
            case "PACIENTE" -> {
                return Role.PACIENTE;
            }
            case "MEDICO" -> {
                return Role.MEDICO;
            }
            default -> {
                return null;
            }
        }
    }

    private void verifyEmailAndRole(User user) {
        var authEmail = getEmailFromAuthentication();
        var authRole = Optional.ofNullable(getRoleFromAuthentication())
                .orElseThrow(() -> new RuntimeException("Unreachable Role"));
        if (!authEmail.equals(user.getEmail()) && !authRole.equals(Role.ADMIN)) {
            throw new AuthorizationDeniedException("No se pueden editar los datos de otros usuarios");
        }
    }
}
