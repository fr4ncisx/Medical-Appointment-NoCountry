package com.healthcare.domain.service.interfaces;

import com.healthcare.domain.dto.request.UserRequestUpdate;
import com.healthcare.domain.dto.response.UserResponse;

public interface IUserService {
    UserResponse getUser(String email);

    void edit(Long id, UserRequestUpdate user);
}
