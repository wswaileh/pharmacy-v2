package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.models.Entities;
import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;
import com.swaileh.lanapharmacy.services.PharmacistService;
import com.swaileh.lanapharmacy.web.rest.errors.BadRequestAlertException;
import com.swaileh.lanapharmacy.web.rest.errors.ErrorConstants;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class PharmacistServiceImpl extends BaseEntityServiceImpl<Pharmacist> implements PharmacistService {

    private final ServiceFactory serviceFactory;

    PharmacistServiceImpl(ServiceFactory serviceFactory) {
        super(Pharmacist.class);
        this.serviceFactory = serviceFactory;
    }

    @Override
    public Pharmacist update(Pharmacist entity) {
        if (Objects.isNull(entity.getId()) || entity.getId().isBlank()) {
            throw new BadRequestAlertException("Request has no ID!", Entities.PHARMACIST.getEntityName(), ErrorConstants.ERR_VALIDATION);
        }

        Pharmacist pharmacist = findOne(entity.getId());

        pharmacist.setName(entity.getName());
        pharmacist.setPid(entity.getPid());

        return save(pharmacist);
    }

}
