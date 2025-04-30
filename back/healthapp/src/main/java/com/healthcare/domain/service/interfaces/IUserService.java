package com.healthcare.domain.service.interfaces;

import com.healthcare.domain.dto.request.UserRequestUpdate;
import com.healthcare.domain.dto.response.UserResponse;

import java.util.List;
import java.util.Map;

public interface IUserService {
    List<UserResponse> getAll();

    UserResponse getOne(String email);

    Map<String, String> edit(Long id, UserRequestUpdate user);
}
