package com.swaileh.lanapharmacy.security.config;

import com.swaileh.lanapharmacy.security.services.JwtTokenService;
import com.swaileh.lanapharmacy.security.services.UserDetailServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@AllArgsConstructor
public class JWTConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final JwtTokenService jwtTokenService;


    private final UserDetailServiceImpl userDetailService;

    @Override
    public void configure(HttpSecurity http) {
        http.addFilterBefore(new AuthTokenFilter(jwtTokenService, userDetailService),
            UsernamePasswordAuthenticationFilter.class);
    }
}
