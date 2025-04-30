package com.healthcare.infrastructure.security;

import java.io.IOException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.healthcare.infrastructure.security.service.AuthService;
import com.healthcare.infrastructure.security.utils.JwtUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    private final AuthService authService;

    private static final String AUTHORIZATION = "Authorization";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (tokenNotPresent(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            var decodedJwt = jwtUtils.validateUserToken(getTokenFromHeader(request));
            authService.validateUser(decodedJwt);
            filterChain.doFilter(request, response);
        } catch (JWTVerificationException | UsernameNotFoundException ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write(
                String.format("{\"error\": \"%s\", \"message\": \"%s\"}", "JWT", ex.getMessage())
            );
        }
    }

    private boolean tokenNotPresent(HttpServletRequest request) {
        return request.getHeader(AUTHORIZATION) == null || request.getHeader(AUTHORIZATION).isBlank();
    }
    private String getTokenFromHeader(@NotNull HttpServletRequest request){
        return request.getHeader(AUTHORIZATION).replace("Bearer ", "");
    }
}
