package com.swaileh.lanapharmacy.services;

import com.swaileh.lanapharmacy.models.drug.Drug;
import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.exceptions.ResourceNotFoundException;

import java.util.Set;

public interface DrugService  extends BaseEntityService<Drug>{

    public Drug update(Drug entity) throws ResourceNotFoundException, BadRequestException;

    public Drug findByBarcode(Long barcode) throws ResourceNotFoundException;

    void deleteByBarcode(Set<Long> ids) throws ResourceNotFoundException;

    void deleteByBarcode(Long id) throws ResourceNotFoundException;
}
