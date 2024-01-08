package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.models.Entities;
import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;
import com.swaileh.lanapharmacy.repositories.pharmacist.PharmacistRepository;
import com.swaileh.lanapharmacy.services.PharmacistService;
import com.swaileh.lanapharmacy.web.rest.errors.BadRequestAlertException;
import com.swaileh.lanapharmacy.web.rest.errors.ErrorConstants;
import com.swaileh.lanapharmacy.web.rest.errors.ResourceNotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class PharmacistServiceImpl extends BaseEntityServiceImpl<Pharmacist> implements PharmacistService {

    PharmacistServiceImpl() {
        super(Pharmacist.class);
    }

    @Override
    public Pharmacist update(Pharmacist entity) {
        if (StringUtils.isBlank(entity.getId())) {
            throw new BadRequestAlertException("Request has no ID!", Entities.PHARMACIST.getEntityName(), ErrorConstants.ERR_VALIDATION);
        }

        Pharmacist pharmacist = findOne(entity.getId());

        pharmacist.setName(entity.getName());

        return save(pharmacist);
    }

    @Override
    public Pharmacist findOneByUserName(String username) {
        return ((PharmacistRepository) getRepository()).findOneByUsername(username)
            .orElseThrow(() -> new ResourceNotFoundException(
                    "User Not Found!",
                    this.getEntityName(),
                    ErrorConstants.ENTITY_NOT_FOUND_TYPE.toString()
                )
            );
    }
}
