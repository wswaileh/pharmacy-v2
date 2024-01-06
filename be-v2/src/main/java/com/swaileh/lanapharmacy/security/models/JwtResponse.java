package com.swaileh.lanapharmacy.security.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;

    private String name;

    private String username;
    private List<String> roles;

    public JwtResponse(String token, String id, String name, String username, List<String> roles) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.username = username;
        this.roles = roles;
    }
}
