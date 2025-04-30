package com.healthcare.domain.model.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority{
    ADMIN,
    MEDICO,
    PACIENTE;

    @Override
    public String getAuthority() {
        return "ROLE_" + toString();
    }
}
