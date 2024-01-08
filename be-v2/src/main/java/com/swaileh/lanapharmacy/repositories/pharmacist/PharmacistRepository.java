package com.swaileh.lanapharmacy.repositories.pharmacist;

import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;
import com.swaileh.lanapharmacy.repositories.EntityRepository;

import java.util.Optional;

public interface PharmacistRepository extends EntityRepository<Pharmacist, String> {
    Optional<Pharmacist> findOneByUsername(String username);
}
