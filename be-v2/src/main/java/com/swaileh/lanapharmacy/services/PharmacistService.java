package com.swaileh.lanapharmacy.services;

import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;

public interface PharmacistService extends BaseEntityService<Pharmacist>, UpdatableEntity<Pharmacist> {

    Pharmacist findOneByUserName(String username);
}
