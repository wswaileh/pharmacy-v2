package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;
import com.swaileh.lanapharmacy.models.exceptions.ResourceNotFoundException;
import com.swaileh.lanapharmacy.services.PharmacistService;
import org.springframework.stereotype.Service;

@Service
public class PharmacistServiceImpl extends BaseEntityServiceImpl<Pharmacist> implements PharmacistService {

    private final ServiceFactory serviceFactory;

    PharmacistServiceImpl(ServiceFactory serviceFactory){
        super(Pharmacist.class);
        this.serviceFactory = serviceFactory;
    }

    @Override
    public Pharmacist update(Pharmacist entity) throws ResourceNotFoundException, BadRequestException {
        if (entity.getId().isBlank()){
            throw new ResourceNotFoundException("No Such Pharmacist!");
        }

        Pharmacist pharmacist = getRepository().findById(entity.getId()).orElseThrow(() -> new ResourceNotFoundException("Pharmacist with id " + entity.getId() + " doesn't exist!"));

        pharmacist.setName(entity.getName());
        pharmacist.setPid(entity.getPid());

        return save(pharmacist);
    }
}
