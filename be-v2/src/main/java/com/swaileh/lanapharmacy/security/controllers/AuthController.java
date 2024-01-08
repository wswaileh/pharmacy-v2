package com.swaileh.lanapharmacy.security.controllers;

import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;
import com.swaileh.lanapharmacy.security.models.JwtResponse;
import com.swaileh.lanapharmacy.security.models.LoginRequest;
import com.swaileh.lanapharmacy.security.models.UserDetailsImpl;
import com.swaileh.lanapharmacy.security.services.JwtTokenService;
import com.swaileh.lanapharmacy.configuration.PathConstants;
import com.swaileh.lanapharmacy.security.utils.SecurityUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RequestMapping(PathConstants.Auth.RESOURCE_BASE_V0)
@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtService;

    @GetMapping(PathConstants.Auth.USER_DETAILS)
    public ResponseEntity<?> getUserDetails() {
        return ResponseEntity.ok().body(SecurityUtils.getCurrentUser());
    }

    @PostMapping(PathConstants.Auth.LOGIN)
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtService.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .findFirst().orElse(null);

        return ResponseEntity.ok(
            new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getName(),
                userDetails.getUsername(),
                role)
        );
    }
}
