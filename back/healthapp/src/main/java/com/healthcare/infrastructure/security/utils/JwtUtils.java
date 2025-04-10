package com.healthcare.infrastructure.security.utils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

import com.healthcare.domain.exceptions.InvalidDataException;
import com.healthcare.domain.exceptions.NotFoundInDatabaseException;
import com.healthcare.domain.model.entity.User;
import com.healthcare.domain.model.enums.Role;
import com.healthcare.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.IncorrectClaimException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.MissingClaimException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.healthcare.infrastructure.dto.request.UserAuthenticated;

@RequiredArgsConstructor
@Component
public class JwtUtils {

    private final UserRepository userRepository;

    @Value("${jwt.secret.key}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private int expirationTime;
    @Value("${jwt.issuer}")
    private String appIssuer;


    public String createToken(UserAuthenticated user) {
        var userRole = user.getRole();
        var userEmail = user.getEmail();
        return JWT.create()
                .withIssuer(appIssuer)
                .withSubject(userEmail)
                .withIssuedAt(generateTimestamp(false))
                .withExpiresAt(generateTimestamp(true))
                .withClaim("role", userRole.toString())
                .withJWTId(generateRandomUUID())
                .withClaim(claimIdRole(userRole), getId(userEmail, userRole))
                .sign(getAlgorithm());
    }

    public DecodedJWT verifyToken(String token) {
        return JWT.require(getAlgorithm())
                .withIssuer(appIssuer)
                .build()
                .verify(token);
    }

    public DecodedJWT validateUserToken(String token) {
        try {
            return verifyToken(token);
        } catch (TokenExpiredException ex) {
            throw new JWTVerificationException("El token ha expirado", ex);
        } catch (SignatureVerificationException ex) {
            throw new JWTVerificationException("La firma del token no es válida", ex);
        } catch (AlgorithmMismatchException ex) {
            throw new JWTVerificationException("El algoritmo del token no coincide", ex);
        } catch (MissingClaimException | IncorrectClaimException ex) {
            throw new JWTVerificationException(ex.getMessage(), ex);
        } catch (JWTVerificationException ex) {
            throw new JWTVerificationException("Error en la verificación del token", ex);
        }
    }

    public User getUserDetails(String token) {
        var decodedJWT = validateUserToken(token);
        String userEmail = decodedJWT.getSubject();
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NotFoundInDatabaseException("El email no se encontró en la base de datos"));
    }

    public <U extends UserDetails> void loadSecurityContext(U user) {
        if (user == null) {
            throw new IllegalArgumentException();
        }
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        securityContext.setAuthentication(auth);
    }

    /**
     * Global usage for patient validation
     * only if id doesnt match with current patient and call id patient
     *
     * @param token        jwt token without bearer
     * @param patientId    id of the patient
     * @param errorMessage error message if it's not authorized
     */
    public void validateTokenPatientId(String token, Long patientId, String errorMessage) {
        User loggedUser = getUser(token);
        if (loggedUser.getRole().equals(Role.PACIENTE)) {
            boolean userIsPatient = loggedUser.getRole().toString().equals("PACIENTE");
            boolean userIdNotEquals = !loggedUser.getPatient().getId().equals(patientId);
            if (userIsPatient && userIdNotEquals) {
                throw new AuthorizationDeniedException(errorMessage);
            }
        }
    }

    private User getUser(String token) {
        return getUserDetails(token);
    }

    private Long getId(String email, Role role) {
        var u = userRepository.findByEmail(email).orElseThrow(() -> new InvalidDataException("Usuario no encontrado, getId"));
        return switch (role) {
            case Role.MEDICO -> u.getMedic().getId();
            case Role.PACIENTE -> u.getPatient().getId();
            case Role.ADMIN -> u.getAdmin().getId();
        };
    }

    private String claimIdRole(Role role) {
        return switch (role) {
            case Role.MEDICO -> "medicId";
            case Role.PACIENTE -> "patientId";
            case Role.ADMIN -> "adminId";
        };
    }

    private String generateRandomUUID() {
        return UUID.randomUUID().toString();
    }

    private Instant generateTimestamp(boolean requireExpiration) {
        if (requireExpiration) {
            return LocalDateTime.now().plusMinutes(expirationTime).atZone(ZoneId.systemDefault()).toInstant();
        }
        return LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant();
    }

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC512(secretKey);
    }
}
