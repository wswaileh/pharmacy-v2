package com.swaileh.lanapharmacy.services;

import com.swaileh.lanapharmacy.models.bill.Bill;
import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.exceptions.ResourceNotFoundException;

public interface BillService extends BaseEntityService<Bill> {
    public Bill update(Bill entity) throws ResourceNotFoundException, BadRequestException;
}
