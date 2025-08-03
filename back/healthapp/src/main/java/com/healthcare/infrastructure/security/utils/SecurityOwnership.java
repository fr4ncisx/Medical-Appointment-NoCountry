package com.healthcare.infrastructure.security.utils;

import com.healthcare.domain.exceptions.InvalidCredentialsException;
import com.healthcare.domain.model.enums.Role;
import com.healthcare.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@RequiredArgsConstructor
@Component("securityOwnership")
public class SecurityOwnership {

    private final UserRepository userRepository;

    /**
     *
     * @param patientId The patient id to request from pathvariable
     * @return {@code true} if the id equals current patient and the request
     * {@code false} if not equals
     */
    public boolean isSamePatientId(Long patientId) {
        Authentication auth = Optional.ofNullable(getCredentials())
                .orElseThrow(() -> new InvalidCredentialsException("No se pudo verificar la autenticación del usuario"));
        var patientUser = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
        if(patientUser.getRole().equals(Role.PACIENTE)){
            var currentPatientId = patientUser.getPatient().getId();
            if(!currentPatientId.equals(patientId))
                throw new AuthorizationDeniedException("No estas autorizado para realizar ésta operación");
        }
        return true;
    }

    public Authentication getCredentials(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return null;
        }
        return auth;
    }
}
