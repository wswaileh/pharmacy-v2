package com.swaileh.lanapharmacy.security.utils;

import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;
import com.swaileh.lanapharmacy.services.PharmacistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Component
public final class SecurityUtils {

    private static PharmacistService pharmacistService;

    public static Optional<String> getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication()).map(authentication -> {
            if (authentication.getPrincipal() instanceof UserDetails) {
                UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
                return springSecurityUser.getUsername();
            } else if (authentication.getPrincipal() instanceof String) {
                return (String) authentication.getPrincipal();
            }
            return null;
        });
    }

    public static Pharmacist getCurrentUser() {
        return SecurityUtils.getCurrentUserLogin()
            .map(s -> pharmacistService.findOneByUserName(s))
            .orElse(null);
    }

    @Autowired
    public void setDependencies(PharmacistService pharmacistService) {
        SecurityUtils.pharmacistService = pharmacistService;
    }
}
