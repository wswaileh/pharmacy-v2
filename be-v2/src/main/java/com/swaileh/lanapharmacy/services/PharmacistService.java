package com.swaileh.lanapharmacy.services;

import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;
import com.swaileh.lanapharmacy.models.exceptions.ResourceNotFoundException;

public interface PharmacistService extends BaseEntityService<Pharmacist> {
    public Pharmacist update(Pharmacist entity) throws ResourceNotFoundException, BadRequestException;
}
