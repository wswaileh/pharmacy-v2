package com.swaileh.lanapharmacy.security.services;

import com.swaileh.lanapharmacy.security.models.UserDetailsImpl;
import com.swaileh.lanapharmacy.services.PharmacistService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

    private final PharmacistService pharmacistService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return UserDetailsImpl.build(pharmacistService.findOneByUserName(username));
    }
}
