package com.healthcare.domain.utils;

import java.util.HashMap;
import java.util.Map;

public final class Response {

    private Response() {
    }

    public static Map<String, String> create(String message) {
        Map<String, String> response = new HashMap<>();
        response.put("status", message);
        return response;
    }

    public static Map<String, String> create(String key, String message) {
        Map<String, String> response = new HashMap<>();
        response.put(key, message);
        return response;
    }
}
