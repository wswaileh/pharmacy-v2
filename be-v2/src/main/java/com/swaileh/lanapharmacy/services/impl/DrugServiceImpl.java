package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.models.Entities;
import com.swaileh.lanapharmacy.models.drug.Drug;
import com.swaileh.lanapharmacy.services.DrugService;
import com.swaileh.lanapharmacy.web.rest.errors.BadRequestAlertException;
import com.swaileh.lanapharmacy.web.rest.errors.ErrorConstants;
import com.swaileh.lanapharmacy.web.rest.errors.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DrugServiceImpl extends BaseEntityServiceImpl<Drug> implements DrugService {

    public DrugServiceImpl() {
        super(Drug.class);
    }

    @Override
    public Drug update(Drug entity) {
        if (Objects.isNull(entity.getId()) || entity.getId().isBlank()) {
            throw new BadRequestAlertException("Request has no ID!", Entities.PHARMACIST.getEntityName(), ErrorConstants.ERR_VALIDATION);
        }

        Drug drug = this.findOne(entity.getId());

        drug.setName(entity.getName());
        drug.setBarcode(entity.getBarcode());
        drug.setCompany(entity.getCompany());
        drug.setCostPrice(entity.getCostPrice());
        drug.setSellingPrice(entity.getSellingPrice());
        drug.setQuantity(entity.getQuantity());

        return this.save(drug);
    }

    @Override
    public Drug findByBarcode(Long barcode) {
        return this.findAll().stream()
            .filter(drug -> drug.getBarcode().equals(barcode))
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException(
                "Drug with barcode " + barcode + " doesn't exist!",
                Entities.DRUG.getEntityName(),
                ErrorConstants.ENTITY_NOT_FOUND_TYPE.toString()
            ));
    }

    public void deleteByBarcode(Long barcode) {
        this.deleteByBarcode(Collections.singleton(barcode));
    }

    public void deleteByBarcode(Set<Long> barcodes) {
        Set<String> ids = findAll().stream().filter(drug -> barcodes.contains(drug.getBarcode()))
            .map(drug -> drug.getId())
            .collect(Collectors.toSet());

        super.delete(ids);
    }
}
