package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.models.bill.Bill;
import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.exceptions.ResourceNotFoundException;
import com.swaileh.lanapharmacy.services.BillService;
import org.springframework.stereotype.Service;

@Service
public class BillServiceImpl extends BaseEntityServiceImpl<Bill> implements BillService {

    private final ServiceFactory serviceFactory;

    public BillServiceImpl(ServiceFactory serviceFactory) {
        super(Bill.class);
        this.serviceFactory = serviceFactory;
    }

    @Override
    public Bill update(Bill entity) throws ResourceNotFoundException, BadRequestException {
        if (entity.getId().isBlank()){
            throw new ResourceNotFoundException("No Such Bill!");
        }

        Bill bill = getRepository().findById(entity.getId()).orElseThrow(() -> new ResourceNotFoundException("Bill with id " + entity.getId() + " doesn't exist!"));

        bill.setItems(entity.getItems());
        bill.setDiscountAmount(entity.getDiscountAmount());
        bill.setDiscountPercentage(entity.getDiscountPercentage());
        bill.calculateTotal();

        return save(bill);

    }
}
