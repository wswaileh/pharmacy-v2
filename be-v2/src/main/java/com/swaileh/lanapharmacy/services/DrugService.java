package com.swaileh.lanapharmacy.services;

import com.swaileh.lanapharmacy.models.drug.Drug;

import java.util.Set;

public interface DrugService extends BaseEntityService<Drug>, UpdatableEntity<Drug> {

    Drug findByBarcode(Long barcode);

    void deleteByBarcode(Set<Long> ids);

    void deleteByBarcode(Long id);
}
