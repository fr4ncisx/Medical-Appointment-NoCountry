package com.healthcare.infrastructure.security.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.healthcare.domain.repository.UserRepository;
import com.healthcare.infrastructure.dto.request.RequestLoginDTO;
import com.healthcare.infrastructure.dto.request.UserAuthenticated;
import com.healthcare.infrastructure.dto.response.ResponseTokenDTO;
import com.healthcare.infrastructure.security.utils.JwtUtils;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final BCryptPasswordEncoder passwordEncoder;

    /**
     * <p>
     * This method checks step by step calling the repository to retrieve the user
     * object
     * <p>
     * Then we check if the raw password and the encoded password matches
     * <p>
     * After that we save into the SecurityContext the authentication of the User
     * <p>
     * Finally we generate a new JWT and send it with a HTTP STATUS CODE 200
     * 
     * @param login json with username and password
     * @return jwt token
     * @throws UsernameNotFoundException If user was not found
     * @throws BadCredentialsException   Password doesnt match user or is invalid
     */
    public ResponseEntity<ResponseTokenDTO> loginUser(RequestLoginDTO login) {
        try {
            UserAuthenticated userDetails = (UserAuthenticated) loadUserByUsername(login.email());
            passwordMatches(login, userDetails);
            loadSecurityContext(userDetails);
            String createdToken = jwtUtils.createToken(userDetails);
            return ResponseEntity.ok(new ResponseTokenDTO(createdToken, null));
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseTokenDTO(null, ex.getMessage()));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseTokenDTO(null, ex.getMessage()));
        }
    }

    /**
     * Checks whether the user exists or not, if exists it converts User to
     * UserAuthenticated
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .map(UserAuthenticated::new)
                .orElseThrow(() -> new UsernameNotFoundException("Email no encontrado"));
    }

    public <U extends UserAuthenticated> void passwordMatches(RequestLoginDTO requestFromLogin, U userFromRepository) {
        if (!passwordEncoder.matches(requestFromLogin.password(), userFromRepository.getPassword())) {
            throw new BadCredentialsException("Contraseña incorrecta");
        }
    }

    public void validateUser(DecodedJWT decodedJWT) {
        UserDetails userDetails = loadUserByUsername(decodedJWT.getSubject());
        jwtUtils.loadSecurityContext(userDetails);
    }                

    public <U extends UserDetails> void loadSecurityContext(U user) {
        if (user == null) {
            throw new IllegalArgumentException();
        }
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        securityContext.setAuthentication(auth);
    }
}
