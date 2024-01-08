package com.swaileh.lanapharmacy.security.models;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;

    private String name;

    private String username;
    private String role;
    private Long expires;

    public JwtResponse(String token, String id, String name, String username, String role) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.username = username;
        this.role = role;
        this.expires = Instant.now().plus(16, ChronoUnit.HOURS).toEpochMilli();
    }
}
