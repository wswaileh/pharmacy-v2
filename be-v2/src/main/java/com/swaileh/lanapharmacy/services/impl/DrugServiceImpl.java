package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.models.drug.Drug;
import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.exceptions.ResourceNotFoundException;
import com.swaileh.lanapharmacy.services.DrugService;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DrugServiceImpl extends BaseEntityServiceImpl<Drug> implements DrugService {

    private final ServiceFactory serviceFactory;

    public DrugServiceImpl(ServiceFactory serviceFactory) {
        super(Drug.class);
        this.serviceFactory = serviceFactory;
    }


    @Override
    public Drug update(Drug entity) throws ResourceNotFoundException, BadRequestException {
        if (entity.getId().isBlank()){
            throw new ResourceNotFoundException("No Such Drug!");
        }

        Drug drug = getRepository().findById(entity.getId()).orElseThrow(() -> new ResourceNotFoundException("Drug with id " + entity.getId() + " doesn't exist!"));

        drug.setName(entity.getName());
        drug.setBarcode(entity.getBarcode());
        drug.setCompany(entity.getCompany());
        drug.setCostPrice(entity.getCostPrice());
        drug.setSellingPrice(entity.getSellingPrice());
        drug.setQuantity(entity.getQuantity());

        return save(drug);
    }

    @Override
    public Drug findByBarcode(Long barcode) throws ResourceNotFoundException {
        return getRepository().findAll().stream().filter(drug -> drug.getBarcode().equals(barcode)).findFirst().orElseThrow(() -> new ResourceNotFoundException("Drug with barcode " + barcode + " doesn't exist!"));
    }

    public void deleteByBarcode(Long barcode) throws ResourceNotFoundException {
        Drug drug = findByBarcode(barcode);
        super.delete(drug.getId());
    }

    public void deleteByBarcode(Set<Long> barcodes) {
        Set<String> ids = findAll().stream().filter(drug -> barcodes.contains(drug.getBarcode()))
            .map(drug -> drug.getId())
            .collect(Collectors.toSet());

        super.delete(ids);
    }
}
